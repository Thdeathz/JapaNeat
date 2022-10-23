import React from 'react'
import { Box, Stack } from '@mui/material'
import WatchingList from './WatchingList'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById, useGetVideosQuery } from './videosSlice'
import { Loading } from '~/components/Layout'

export default function VideoDetail() {
  const { videoId } = useParams()
  const { isLoading } = useGetVideosQuery()
  const video = useSelector(state => selectVideoById(state, Number(videoId)))

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box className="flex justify-center">
            <Stack
              className="py-2 h-[75vh] desktop:w-[90vw]"
              direction="row"
              spacing={4}
              justifyContent="center"
            >
              <Box
                className="h-full flex flex-row justify-center items-center bg-slate-900"
                flex={8}
              >
                <video className="hover:cursor-pointer w-full h-full" controls>
                  <source src={video.video.url} type="video/mp4" />
                </video>
              </Box>
              <Box className="bg-secondary h-full" flex={3}>
                <WatchingList />
              </Box>
            </Stack>
          </Box>
          <Box className="flex justify-center">
            <Stack
              className="py-2 desktop:w-[90vw]"
              direction="row"
              spacing={4}
              justifyContent="center"
            >
              <Box className="h-full" flex={8} color="secondary">
                <Box className="flex justify-between items-center">
                  <h1 className="font-bold text-default text-4xl">{video.title}</h1>
                  <h1 className="text-xl">3 watching</h1>
                </Box>
                <p className="mt-2 text-default text-base">{video.description}</p>
              </Box>
              <Box className="h-full flex flex-col items-center gap-4" flex={3}>
                {/* <VideoCard />
              <VideoCard /> */}
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </>
  )
}
