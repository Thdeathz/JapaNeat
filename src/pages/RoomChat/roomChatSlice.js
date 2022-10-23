import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDocument, deleteDocument, updateDocument } from '~/firebase/services'

const initialState = {
  currentRoomId: null
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

export const deleteRoomChat = createAsyncThunk('roomChat/deleteRoomChat', async initialState => {
  try {
    await deleteDocument({
      collectionName: `watchings/${initialState.videoId}/rooms`,
      id: initialState.roomId
    })
  } catch (error) {
    console.log(error)
  }
})

const roomChatSlice = createSlice({
  name: 'roomChat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendOffer.fulfilled, (state, action) => {
        state.currentRoomId = action.payload
      })
      .addCase(deleteRoomChat.fulfilled, (state, action) => {
        state.currentRoomId = null
      })
  }
})

export const getCurrentRoomId = state => state.roomChat.currentRoomId

export default roomChatSlice.reducer
