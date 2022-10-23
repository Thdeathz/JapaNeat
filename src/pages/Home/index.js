import React from 'react'
import { Box } from '@mui/material'
import VideoList from './VideoList'
import RecordList from './RecordList'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { Loading } from '~/components/Layout'

export default function Home() {
  const { isLoading } = useGetVideosQuery()

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="flex flex-col justify-center items-center gap-24">
          <Box>
            <h1 className="text-bold text-4xl text-center mb-4">Videos</h1>
            <VideoList />
          </Box>
          <Box>
            <h1 className="text-bold text-4xl text-center mb-4">Records</h1>
            <RecordList />
          </Box>
        </Box>
      )}
    </>
  )
}
