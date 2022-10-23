import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectVideoById } from '../VideoDetail/videosSlice'

export default function VideoControl() {
  const { videoId } = useParams()

  const video = useSelector(state => selectVideoById(state, Number(videoId)))

  return (
    <Box className="h-full flex flex-col gap-4">
      <Box className="basis-3/4 bg-slate-900">
        <video className="hover:cursor-pointer w-full h-full" controls>
          <source src={video.video.url} type="video/mp4" />
        </video>
      </Box>
      <Box className="h-full" flex={8} color="secondary">
        <Box className="flex justify-between items-center">
          <h1 className="font-bold text-default text-4xl">{video.title}</h1>
          <h1 className="text-xl">{video.category}</h1>
        </Box>
        <p className="mt-2 text-default text-base">{video.description}</p>
      </Box>
    </Box>
  )
}
