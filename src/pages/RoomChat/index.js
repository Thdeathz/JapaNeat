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
          <Box className="laptop:flex justify-center gap-4 py-2 laptop:h-[80vh] desktop:w-[90vw]">
            <Box className="laptop:h-full basis-[70%]" color="secondary">
              <VideoControl video={video} />
            </Box>
            <Box className="laptop:h-full basis-[25%]" color="secondary">
              <VideoCall video={video} />
            </Box>
            <Box className="bg-secondary laptop:h-full h-[500px] basis-[30%]">
              <ChatBox />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
