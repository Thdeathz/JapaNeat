import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDocument, updateDocument } from '~/firebase/services'

const initialState = {
  roomId: null
}

export const sendOffer = createAsyncThunk('roomChat/createOffer', async initialState => {
  try {
    await addDocument({
      collectionName: `watchings/${initialState.videoId}/rooms`,
      id: initialState.roomId,
      data: {
        ...initialState,
        status: 'waitting'
      }
    })

    return initialState.roomId
  } catch (error) {
    console.log(error)
  }
})

export const changeRoomStatus = createAsyncThunk(
  'roomChat/changeRoomStatus',
  async initialState => {
    try {
      await updateDocument({
        collectionName: `watchings/${initialState.videoId}/rooms`,
        id: initialState.roomId,
        data: {
          status: 'accepted'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
)

const roomChatSlice = createSlice({
  name: 'roomChat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendOffer.fulfilled, (state, action) => {
      state.roomId = action.payload
    })
  }
})

export const getRoomId = state => state.roomId

export default roomChatSlice.reducer
