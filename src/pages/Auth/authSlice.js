import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCerdentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    }
  }
})

// selectors
export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token

// reducers
export const { setCerdentials, logOut } = authSlice.actions

export default authSlice.reducer
