import React from 'react'
import { Box } from '@mui/material'
import VideoList from './VideoList'
import RecordList from './RecordList'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { Loading } from '~/components/Layout'
import { useGetRecordsQuery } from '../RecordDetail/recordsSlice'

export default function Home() {
  const { isLoading: videoLoading } = useGetVideosQuery()
  const { isLoading: recordLoading } = useGetRecordsQuery()

  return (
    <>
      {videoLoading || recordLoading ? (
        <Loading />
      ) : (
        <Box className="flex flex-col justify-center items-center gap-24">
          <VideoList />
          <RecordList />
        </Box>
      )}
    </>
  )
}
