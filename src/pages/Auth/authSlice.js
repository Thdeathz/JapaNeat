import { apiSlice } from '~/api/apiSlice'
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
    setLogout: (state, action) => {
      state.user = null
      state.token = null
    }
  }
})

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => '/logout'
    }),
    getCurrentUser: builder.query({
      query: () => '/me',
      providesTags: ['Auth']
    })
  })
})

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } = authApiSlice

// selectors
export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token

// reducers
export const { setCerdentials, setLogout } = authSlice.actions

export default authSlice.reducer
