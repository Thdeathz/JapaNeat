import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import WatchingList from './WatchingList'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchinglist, selectVideoById, useGetVideosQuery } from './videosSlice'
import { Loading } from '~/components/Layout'
import { getDocument } from '~/firebase/services'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '~/firebase/config'

export default function VideoDetail() {
  const dispatch = useDispatch()
  const { videoId } = useParams()
  const { isLoading } = useGetVideosQuery()
  const video = useSelector(state => selectVideoById(state, Number(videoId)))
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  // const offerList = useFirestore(`watchings/${videoId}/rooms`)

  useEffect(() => {
    const handleAddUserToWatchingList = async () => {
      if (currentUserData) {
        dispatch(
          addToWatchinglist({
            videoId: videoId,
            userData: currentUserData
          })
        )
      }
    }

    return handleAddUserToWatchingList
  }, [currentUserData, videoId])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box className="flex justify-center">
            <Box className="laptop:flex justify-center gap-4 py-2 laptop:h-[75vh] desktop:w-[90vw]">
              <Box className="laptop:h-full flex justify-center bg-slate-900" flex={8}>
                <video className="hover:cursor-pointer w-full h-full" controls>
                  <source src={video.video.url} type="video/mp4" />
                </video>
              </Box>
              <Box className="bg-secondary laptop:h-full h-[500px]" flex={3}>
                <WatchingList />
              </Box>
            </Box>
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
