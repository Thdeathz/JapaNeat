import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '~/hooks/getCookie'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api',
  // baseUrl: 'https://japaneat.herokuapp.com/api',
  keepUnusedDataFor: '60s',
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json')
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
  tagTypes: ['Auth', 'Video', 'Record', 'Achievement', 'Ranking'],
  endpoints: builder => ({})
})
