import { Box, Stack } from '@mui/material'
import React from 'react'
import ChatBox from './ChatBox'
import VideoControl from './VideoControl'
import VideoCall from './VideoCall'
import { selectVideoById, useGetVideosQuery } from '../VideoDetail/videosSlice'
import { Loading } from '~/components/Layout'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RoomChat() {
  const { videoId } = useParams()
  const { isLoading } = useGetVideosQuery()

  const video = useSelector(state => selectVideoById(state, videoId))

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="flex justify-center">
          <Stack
            className="py-2 h-[80vh] desktop:w-[90vw]"
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Box className="h-full" flex={9} color="secondary">
              <VideoControl video={video} />
            </Box>
            <Box className="h-full" flex={3} color="secondary">
              <VideoCall video={video} />
            </Box>
            <Box className="bg-secondary h-full" flex={4}>
              <ChatBox />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}
