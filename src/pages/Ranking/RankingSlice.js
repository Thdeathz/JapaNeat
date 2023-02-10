import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const rankingAdapter = createEntityAdapter({})

const initialState = rankingAdapter.getInitialState()

export const rankingApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRanking: builder.query({
      query: () => '/user/ranking',
      transformResponse: res => {
        return rankingAdapter.setAll(initialState, res.data)
      },
      providesTags: (error, arg) => [{ type: 'Ranking', id: 'List' }]
    })
  })
})

export const { useGetRankingQuery } = rankingApiSlice

export const selectRankingResult = rankingApiSlice.endpoints.getRanking.select()

const selectRanking = createSelector(selectRankingResult, result => result.data)

export const { selectAll: selectAllRanking } = rankingAdapter.getSelectors(
  state => selectRanking(state) ?? initialState
)
