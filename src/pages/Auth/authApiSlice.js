import { apiSlice } from '~/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    logOut: builder.query({
      query: () => '/logout'
    }),
    getCurrentUser: builder.query({
      query: () => '/me',
      providesTags: ['Auth']
    })
  })
})

export const { useLoginMutation, useLogOutQuery, useGetCurrentUserQuery } = authApiSlice
