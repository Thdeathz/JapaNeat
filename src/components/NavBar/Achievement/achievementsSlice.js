import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const achievementsAdapter = createEntityAdapter({})

const initialState = achievementsAdapter.getInitialState({})

export const achievementsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAchievements: builder.query({
      query: () => '/achievements',
      transformResponse: res => {
        return achievementsAdapter.setAll(initialState, res.data)
      },
      providesTags: (result, error, arg) => [
        { type: 'Achievement', id: 'List' },
        ...result.ids.map(id => ({ type: 'Achievement', id }))
      ]
    }),
    getCurrentPoint: builder.query({
      query: userId => `/user/point/${userId}`,
      providesTags: ['Achievement']
    })
  })
})

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {}
})

export const { useGetAchievementsQuery, useGetCurrentPointQuery } = achievementsApiSlice

export const selectAchievementsResult = achievementsApiSlice.endpoints.getAchievements.select()

const selectAchievementsData = createSelector(
  selectAchievementsResult,
  achievementsResult => achievementsResult.data
)

export const { selectAll: selectAllAchievements } = achievementsAdapter.getSelectors(
  state => selectAchievementsData(state) ?? initialState
)

export default achievementsSlice.reducer
