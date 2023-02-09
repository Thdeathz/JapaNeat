import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { selectVideoById, useGetVideosQuery } from '../VideoDetail/videosSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexBetween, Loading } from '~/components'
import useFirestore from '~/hooks/useFirestore'
import { APP_ID } from '~/agora/config'
import { useClient, useMicrophoneAndCameraTracks } from '~/agora/rtc'
import { AgoraVideoPlayer } from 'agora-rtc-react'
import { toast } from 'react-toastify'
import VideoCallControl from './VideoCallControl'

export default function RoomChat() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { roomId, videoId } = useParams()
  const { isLoading } = useGetVideosQuery()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const video = useSelector(state => selectVideoById(state, videoId))
  const roomData = useFirestore(`watchings/${videoId}/rooms`, roomId)

  const client = useClient()
  const { ready, tracks } = useMicrophoneAndCameraTracks()
  const [remoteUser, setRemoteUser] = useState(null)

  useEffect(() => {
    let initRoom = async () => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        if (mediaType === 'video') {
          setRemoteUser(user)
        }
        if (mediaType === 'audiox') {
          user.audioTrack.play()
        }
      })

      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio') {
          if (user.audioTrack) user.audioTrack.stop()
        }
        if (mediaType === 'video') {
          setRemoteUser(null)
        }
      })

      client.on('user-left', user => {
        setRemoteUser(null)
      })

      await client.join(APP_ID, roomId, null, currentUser.id)
      if (tracks) await client.publish([tracks[0], tracks[1]])
    }

    const leaveRoom = async () => {
      await client.leave()
      client.removeAllListeners()
      tracks[0].close()
      tracks[1].close()
      navigate('/')
    }

    if (ready && tracks) {
      initRoom()
    }

    if (!roomData) {
      leaveRoom()
      toast.info('Your Kaiwa session is over !!!', {
        toastId: 1
      })
    }

    return async () => leaveRoom
  }, [videoId, roomId, ready, tracks, roomData])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FlexBetween
          flexDirection="column"
          gap="1rem"
          className="bg-slate-800 w-screen h-screen overflow-hidden p-4"
        >
          {console.log('===> remoteUser', remoteUser)}
          <Box className="basis-11/12 w-full" sx={{ borderRadius: '0.5rem' }}>
            <FlexBetween className="w-full h-full lg:flex-row flex-col" gap="1.5rem">
              <FlexBetween alignItems="center" className="basis-3/4 h-full ">
                <video className="w-full rounded-lg hover:cursor-pointer" controls>
                  <source src={video.video.url} type="video/mp4" />
                </video>
              </FlexBetween>

              <FlexBetween className="basis-1/4 w-full h-full lg:flex-col" gap="1rem">
                <FlexBetween className="bg-white basis-1/2 w-full h-full rounded-lg relative">
                  {ready && (
                    <AgoraVideoPlayer
                      id="video-call"
                      videoTrack={tracks[1]}
                      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                    />
                  )}

                  <Typography
                    variant="h6"
                    className="absolute bottom-0 left-2"
                    sx={{ color: '#6aa6fa' }}
                  >
                    You
                  </Typography>
                </FlexBetween>

                <FlexBetween className="bg-white basis-1/2 w-full h-full rounded-lg relative">
                  {remoteUser?.videoTrack && (
                    <AgoraVideoPlayer
                      id="video-call"
                      style={{ height: '100%', width: '100%' }}
                      videoTrack={remoteUser.videoTrack}
                    />
                  )}

                  <Typography
                    variant="h6"
                    className="absolute bottom-0 left-2"
                    sx={{ color: '#6aa6fa' }}
                  >
                    {roomData?.offerId === currentUser.id
                      ? roomData?.answerDisplayName
                      : roomData?.offerDisplayName}
                  </Typography>
                </FlexBetween>
              </FlexBetween>
            </FlexBetween>
          </Box>

          <VideoCallControl client={client} tracks={tracks} videoData={video} roomData={roomData} />
        </FlexBetween>
      )}
    </>
  )
}
