import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'
import authReducer from '~/pages/Auth/authSlice'
import videosReducer from '~/pages/VideoDetail/videosSlice'
import roomChatReducer from '~/pages/RoomChat/roomChatSlice'
import achievementsReducer from '~/components/NavBar/Achievement/achievementsSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    videos: videosReducer,
    roomChat: roomChatReducer,
    achievements: achievementsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store
