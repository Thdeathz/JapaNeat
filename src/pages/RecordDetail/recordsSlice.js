import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '~/api/apiSlice'

const recordsAdapter = createEntityAdapter({})

const initialState = recordsAdapter.getInitialState({
  currentUser: JSON.parse(localStorage.getItem('currentUser'))
})

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRecords: builder.query({
      query: () => '/record_details',
      transformResponse: res => {
        if (initialState.currentUser?.role === 0) {
          const teacherRecord = res.data.filter(
            record => record.teacher.id === initialState.currentUser.id
          )
          return recordsAdapter.setAll(initialState, teacherRecord)
        }
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
      invalidatesTags: [{ type: 'Record', id: 'List' }]
    }),
    addFeedback: builder.mutation({
      query: initialFeedback => ({
        url: '/feedback',
        method: 'POST',
        body: {
          ...initialFeedback
        }
      }),
      invalidatesTags: [{ type: 'Record', id: 'Feedback' }]
    })
  })
})

export const { useGetRecordsQuery, useAddNewRecordMutation, useAddFeedbackMutation } =
  recordsApiSlice

export const selectRecordResult = recordsApiSlice.endpoints.getRecords.select()

const selectRecordData = createSelector(selectRecordResult, recordsResult => recordsResult.data)

export const {
  selectAll: selectAllVideos,
  selectById: selectRecordById,
  selectIds: selectRecordIds
} = recordsAdapter.getSelectors(state => selectRecordData(state) ?? initialState)
