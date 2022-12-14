import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '~/hooks/getCookie'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api',
  // baseUrl: 'https://japaneat.herokuapp.com/api',
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
