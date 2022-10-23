import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const recordsAdapter = createEntityAdapter({})

const initialState = recordsAdapter.getInitialState({})

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRecords: builder.query({
      query: () => '/record_details',
      transformResponse: res => {
        return recordsAdapter.setAll(initialState, res.data)
      },
      providesTags: (result, error, arg) => [
        { type: 'Record', id: 'List' },
        ...result.ids.map(id => ({ type: 'Record', id }))
      ]
    }),
    addNewRecord: builder.mutation({
      query: initialRecord => ({
        url: '/record_details',
        method: 'POST',
        body: {
          ...initialRecord
        }
      }),
      invalidatesTags: [{ type: 'Post', id: 'List' }]
    })
  })
})

export const { useGetRecordsQuery, useAddNewRecordMutation } = recordsApiSlice

export const selectRecordResult = recordsApiSlice.endpoints.getRecords.select()

const selectRecordData = createSelector(selectRecordResult, recordsResult => recordsResult.data)

export const {
  selectAll: selectAllVideos,
  selectById: selectRecordById,
  selectIds: selectRecordIds
} = recordsAdapter.getSelectors(state => selectRecordData(state) ?? initialState)
