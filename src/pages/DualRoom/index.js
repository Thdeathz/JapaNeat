import React, { useEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Typography } from '@mui/material'
import { AgoraVideoPlayer } from 'agora-rtc-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useClient, useMicrophoneAndCameraTracks } from '~/agora/rtc'
import { ChatBox, FlexBetween, Loading } from '~/components'
import useFirestore from '~/hooks/useFirestore'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { toast } from 'react-toastify'
import images from '~/assets/images'
import { APP_ID } from '~/agora/config'
import { updateDocument } from '~/firebase/services'
import { useReactMediaRecorder } from 'react-media-recorder'
import useMergeFiles from '~/hooks/useMergeFiles'
import uploadFile from '~/hooks/uploadFile'

function DualRoom() {
  const navigate = useNavigate()

  const { roomId } = useParams()
  const { data: videos, isLoading } = useGetVideosQuery()
  const { handleMergeFiles } = useMergeFiles()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const roomData = useFirestore(`dual`, roomId)
  const messageList = useFirestore(`dual/${roomId}/messages`)

  const client = useClient()
  const { ready, tracks } = useMicrophoneAndCameraTracks()
  const [remoteUser, setRemoteUser] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isProcessRecord, setIsProcessRecord] = useState(false)

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true
  })

  const videoRef = useRef(null)

  const handleChangeCurrentVideo = async (videoUrl, videoId) => {
    await updateDocument({
      collectionName: `dual`,
      id: roomId,
      data: {
        videoId,
        videoUrl,
        battleStatus: 'idle'
      }
    })
  }

  const handleBattleControl = async () => {
    if (roomData) {
      await updateDocument({
        collectionName: `dual`,
        id: roomId,
        data: {
          battleStatus: roomData.battleStatus === 'playing' ? 'idle' : 'playing'
        }
      })

      if (roomData.battleStatus === 'idle') {
        startRecording()
      }
    }
  }

  const handleEndVideo = async () => {
    if (roomData) {
      console.log('==> video ended')
      stopRecording()
      setIsProcessRecord(true)
      await updateDocument({
        collectionName: `dual`,
        id: roomId,
        data: {
          battleStatus: 'idle'
        }
      })
      if (roomData.battleStatus === 'playing') {
        const blob = await fetch(mediaBlobUrl).then(r => r.blob())
        if (blob) {
          const file = new File([blob], 'audio', { type: 'audio/wav' })
          console.log('==> mediaBlobUrl', file)

          setTimeout(async () => {
            await updateDocument({
              collectionName: `dual`,
              id: roomId,
              data: {
                lastRecord: currentVideo
              }
            })
            setIsProcessRecord(false)
          }, 5000)
          // handleMergeFiles(roomData.videoUrl, fileUrl)
        }
      }
    }
  }

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
    }

    if (ready && tracks) {
      initRoom()
    }

    if (!roomData) {
      leaveRoom()
      navigate('/videos')
      toast.info('Your dual battle is over !!!', {
        toastId: 1
      })
    }

    return () => {}
  }, [roomId, ready, tracks])

  useEffect(() => {
    const handleRoomDataChange = () => {
      if (roomData?.videoUrl !== currentVideo) {
        setCurrentVideo(roomData.videoUrl)
      }
      if (roomData?.battleStatus === 'playing') {
        videoRef?.current?.play()
      } else {
        videoRef?.current?.pause()
      }
    }

    handleRoomDataChange()

    return () => {}
  }, [roomData])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FlexBetween gap="0.5rem" className=" w-screen h-screen overflow-hidden">
          <FlexBetween
            flexDirection="column"
            className="basis-3/4 h-full pl-2 py-2"
            sx={{ borderRadius: '0.5rem' }}
          >
            <FlexBetween gap="0.5rem" className="w-full h-[65vh] mb-2">
              <Box className="basis-3/4 bg-slate-800">
                {currentVideo && (
                  <video
                    ref={videoRef}
                    className="rounded-lg"
                    src={currentVideo}
                    type="video/mp4"
                    onEnded={handleEndVideo}
                    muted
                  />
                )}
              </Box>

              <FlexBetween flexDirection="column" className="basis-1/4 w-full h-full" gap="0.5rem">
                <FlexBetween className="bg-slate-800 basis-1/2 w-full h-full rounded-lg relative">
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

                <FlexBetween className="bg-slate-800 basis-1/2 w-full h-full rounded-lg relative">
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

            <FlexBetween gap="0.5rem" className="bg-secondary w-full h-[35vh] p-2 rounded-lg">
              <FlexBetween flexDirection="column" className="basis-[50%] h-full">
                <Box className="bg-slate-800 w-full h-full rounded-lg">
                  {roomData?.lastRecord && (
                    <video
                      className="w-full h-full rounded-lg"
                      src={roomData?.lastRecord}
                      type="video/mp4"
                      controls
                    />
                  )}
                </Box>
              </FlexBetween>

              <FlexBetween flexDirection="column" className="basis-[30%] h-full">
                <Box id="video-list" className="w-full flex flex-col gap-1 overflow-y-scroll">
                  {videos.ids.map((id, index) => (
                    <ButtonBase
                      key={`next-video-list-${index}`}
                      sx={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        backgroundColor: roomData?.videoId === id ? 'rgba(0, 0, 0, 0.25)' : 'none',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.15)' }
                      }}
                      onClick={() => handleChangeCurrentVideo(videos.entities[id].video.url, id)}
                    >
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        gap={2}
                        className="w-full p-2"
                      >
                        <img
                          className="w-[30%] rounded"
                          src={videos.entities[id].video.thumbnail ?? images.noImage}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              textOverflow: 'break-word',
                              fontWeight: '500',
                              textAlign: 'left'
                            }}
                          >
                            {videos.entities[id].title}
                          </Typography>

                          <Typography
                            variant="h8"
                            sx={{
                              textAlign: 'left'
                            }}
                          >
                            {videos.entities[id].category}
                          </Typography>
                        </Box>
                      </Box>
                    </ButtonBase>
                  ))}
                </Box>
              </FlexBetween>

              <Box flexDirection="column" className="basis-[20%] h-full">
                <Box>
                  <Typography variant="h6">{roomData?.offerDisplayName}</Typography>
                  <Typography variant="h6">{roomData?.answerDisplayName}</Typography>
                </Box>

                <ButtonBase
                  sx={{
                    width: '100%',
                    py: '0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#fff',
                    backgroundColor: '#6aa6fa'
                  }}
                  onClick={handleBattleControl}
                >
                  {roomData?.battleStatus === 'playing' ? 'Pause dual' : 'Start dual'}
                </ButtonBase>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Box className="basis-1/4 h-full bg-secondary">
            <ChatBox collectionName={`dual/${roomId}/messages`} messageList={messageList} />
          </Box>
        </FlexBetween>
      )}
    </>
  )
}

export default DualRoom
