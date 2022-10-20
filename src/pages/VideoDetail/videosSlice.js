import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { addDocument, deleteDocument } from '~/firebase/services'

const initialState = {
  currentVideoId: null
}

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToWatchinglist.fulfilled, (state, action) => {
        state.currentVideoId = action.payload
      })
      .addCase(deleteFromWatchinglist.fulfilled, (state, action) => {
        state.currentVideoId = null
      })
  }
})

export const { addCurrentVideoId } = videosSlice.actions

export const getCurrentVideoId = state => state.videos.currentVideoId

export default videosSlice.reducer
