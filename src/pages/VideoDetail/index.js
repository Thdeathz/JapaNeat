import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToWatchinglist,
  deleteFromWatchinglist,
  selectVideoById,
  useGetVideosQuery
} from './videosSlice'
import { Loading } from '~/components'
import RightMenu from './RightMenu'

export default function VideoDetail() {
  const dispatch = useDispatch()
  const { videoId } = useParams()

  const { isLoading } = useGetVideosQuery()
  const video = useSelector(state => selectVideoById(state, Number(videoId)))
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    const handleAddUserToWatchingList = async () => {
      console.log('==> add user')
      if (currentUserData) {
        dispatch(
          addToWatchinglist({
            videoId,
            userData: currentUserData
          })
        )
      }
    }

    handleAddUserToWatchingList()

    return () => {
      dispatch(
        deleteFromWatchinglist({
          videoId,
          userData: currentUserData
        })
      )
    }
  }, [videoId])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box className="w-screen h-screen flex lg:flex-row flex-col">
            <video className="lg:w-[75vw] w-full h-screen bg-black hover:cursor-pointer" controls>
              <source src={video.video.url} type="video/mp4" />
            </video>
            <Box className="lg:w-[25vw] w-full h-screen">
              <RightMenu videoDetail={video} />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
