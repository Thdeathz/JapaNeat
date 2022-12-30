import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'
import { addDocument, deleteDocument } from '~/firebase/services'

const videosAdapter = createEntityAdapter({})

const initialState = videosAdapter.getInitialState()

export const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVideos: builder.query({
      query: () => '/video_details',
      transformResponse: res => {
        return videosAdapter.setAll(initialState, res.data)
      },
      providesTags: (result, error, arg) => [
        { type: 'Video', id: 'List' },
        ...result.ids.map(id => ({ type: 'Video', id }))
      ]
    })
  })
})

export const addToWatchinglist = createAsyncThunk('videos/addWatchinglist', async initialState => {
  try {
    await addDocument({
      collectionName: `watchings/${initialState.videoId}/members`,
      id: initialState.userData.id,
      data: {
        userName: initialState.userData.name
      }
    })
    return initialState.videoId
  } catch (error) {
    console.log(error)
  }
})

export const deleteFromWatchinglist = createAsyncThunk(
  'videos/deleteUserFromWatchingList',
  async initialState => {
    try {
      await deleteDocument({
        collectionName: `watchings/${initialState.videoId}/members`,
        id: initialState.userData.id
      })
    } catch (error) {
      console.log(error)
    }
  }
)

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {}
})

export const { useGetVideosQuery } = videosApiSlice

export const selectVideoResult = videosApiSlice.endpoints.getVideos.select()

const selectVideosData = createSelector(selectVideoResult, videosResult => videosResult.data)

export const {
  selectAll: selectAllVideos,
  selectById: selectVideoById,
  selectIds: selectVideoIds
} = videosAdapter.getSelectors(state => selectVideosData(state) ?? initialState)

export default videosSlice.reducer
