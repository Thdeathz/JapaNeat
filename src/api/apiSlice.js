import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '~/hooks/getCookie'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://japaneat.herokuapp.com/api',
  prepareHeaders: headers => {
    const token = getCookie('token')
    if (token) {
      headers.set('Authorization', 'Bearer ' + token)
    }
    return headers
  }
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Auth', 'Video', 'Record', 'Achievement'],
  endpoints: builder => ({})
})
