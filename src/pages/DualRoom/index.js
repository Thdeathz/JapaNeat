import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  useMediaQuery
} from '@mui/material'
import AgoraRTC from 'agora-rtc-sdk-ng'
import { useNavigate, useParams } from 'react-router-dom'
import { useClient } from '~/agora/rtc'
import { ChatBox, FlexBetween, Loading } from '~/components'
import useFirestore from '~/hooks/useFirestore'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import { toast } from 'react-toastify'
import images from '~/assets/images'
import { deleteDocument, updateDocument } from '~/firebase/services'
import { useReactMediaRecorder } from 'react-media-recorder'
import useMergeFiles from '~/hooks/useMergeFiles'
import uploadFile from '~/hooks/uploadFile'
import NextVideoSelect from './NextVideoSelect'
import { ArrowBackOutlined } from '@mui/icons-material'
import UserCamera from './UserCamera'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const APP_ID = process.env.REACT_APP_AGORA_APP_ID

function DualRoom() {
  const navigate = useNavigate()

  const { roomId, offerId, answerId } = useParams()
  const { data: videos, isLoading } = useGetVideosQuery()
  const { handleMergeFiles } = useMergeFiles()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const roomData = useFirestore(`dual`, roomId)
  const messageList = useFirestore(`dual/${roomId}/messages`)

  const client = useClient()
  const [currentVideo, setCurrentVideo] = useState(null)
  const [tracks, setTracks] = useState(null)
  const [offerUser, setOfferUser] = useState(null)
  const [answerUser, setAnswerUser] = useState(null)
  const [isCalculatePoint, setIsCalculatePoint] = useState(false)
  const [isVoted, setIsVoted] = useState(false)

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true
  })

  const videoRef = useRef(null)
  const isDesktopScreen = useMediaQuery('(min-width:1024px)')
  const isOfferUser = currentUser.id === Number(offerId)
  const isAnswerUser = currentUser.id === Number(answerId)

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
      await updateDocument({
        collectionName: `dual`,
        id: roomId,
        data: {
          battleStatus: 'recordProcessing',
          calculatePoint: 'processing'
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
                lastRecord: currentVideo,
                battleStatus: 'idle',
                calculatePoint: 'idle'
              }
            })
          }, 10000)

          // handleMergeFiles(roomData.videoUrl, fileUrl)
        }
      }
    }
  }

  const handleLeaveRoom = async () => {
    await client.leave()
    client.removeAllListeners()
    tracks[0].close()
    tracks[1].close()

    await deleteDocument({
      collectionName: `dual`,
      id: roomId
    })

    if (roomData?.offerPoint === roomData?.answerPoint) {
      toast.info('Your dual battle is over !!!', {
        toastId: 1
      })
    }

    if (roomData?.offerPoint > roomData?.answerPoint) {
      toast.info(`${roomData?.offerDisplayName} is the winner !!!`, {
        toastId: 1
      })
    }

    if (roomData?.offerPoint < roomData?.answerPoint) {
      toast.info(`${roomData?.answerDisplayName} is the winner !!!`, {
        toastId: 1
      })
    }

    navigate('/videos')
  }

  const handleVote = async userId => {
    let offerPoint = Number(roomData?.offerPoint)
    let answerPoint = Number(roomData?.answerPoint)

    if (userId == offerId) offerPoint = offerPoint + 1
    if (userId == answerId) answerPoint = answerPoint + 1

    await updateDocument({
      collectionName: `dual`,
      id: roomId,
      data: {
        offerPoint: offerPoint,
        answerPoint: answerPoint
      }
    })

    setIsCalculatePoint(false)
    setIsVoted(true)
  }

  useEffect(() => {
    let initRoom = async () => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)

        if (mediaType === 'video') {
          if (isOfferUser || isAnswerUser) {
            if (user.uid == offerId || user.uid == answerId) setAnswerUser(user)
          } else {
            if (user.uid == offerId) setOfferUser(user)
            if (user.uid == answerId) setAnswerUser(user)
          }
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
          if (user.uid == offerId) {
            setOfferUser(null)
          }
          if (user.uid == answerId) {
            setAnswerUser(null)
          }
        }
      })

      client.on('user-left', user => {
        if (user.uid == offerId) {
          setOfferUser(null)
        }
        if (user.uid == answerId) {
          setAnswerUser(null)
        }
      })

      await client.join(APP_ID, roomId, null, currentUser.id)
    }

    const joinRoom = async () => {
      if (tracks) {
        await client.publish([tracks[0], tracks[1]])
      }
    }

    const leaveRoom = async () => {
      await client.leave()
      client.removeAllListeners()
      tracks[0].close()
      tracks[1].close()
    }

    initRoom()

    joinRoom()

    if (!roomData) {
      leaveRoom()
      navigate('/videos')
      toast.info('Dual battle is over !!!', {
        toastId: 1
      })
    }

    return () => {}
  }, [roomId, currentUser, tracks])

  useEffect(() => {
    const handleRoomDataChange = async () => {
      if (roomData?.videoUrl !== currentVideo) {
        setCurrentVideo(roomData?.videoUrl)
        setIsVoted(false)
      }

      if (roomData?.battleStatus === 'playing') {
        videoRef?.current?.play()
      } else {
        videoRef?.current?.pause()
      }

      if (roomData?.calculatePoint === 'processing' && !isVoted) {
        setIsCalculatePoint(true)
      }
    }

    handleRoomDataChange()

    return () => {}
  }, [roomData])

  useEffect(() => {
    const handleGetMedia = async () => {
      if (isOfferUser || isAnswerUser) {
        const media = await AgoraRTC.createMicrophoneAndCameraTracks(
          {},
          {
            encoderConfig: {
              width: { min: 640, ideal: 1920, max: 1920 },
              height: { min: 480, ideal: 1080, max: 1080 }
            }
          }
        )
        setTracks(media)
      }
    }

    handleGetMedia()

    return () => {}
  }, [])

  return (
    <>
      {isLoading || !roomData ? (
        <Loading />
      ) : (
        <>
          {/*BACK ARROW*/}
          {!isOfferUser && !isAnswerUser && (
            <Box className="px-5 py-2 absolute top-0 z-50">
              <ButtonBase
                sx={{
                  px: '0.25rem',
                  borderRadius: '0.25rem ',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackOutlined sx={{ color: '#6aa6fa' }} />
                <Typography variant="h6" color="#6aa6fa">
                  Back
                </Typography>
              </ButtonBase>
            </Box>
          )}

          {roomData?.calculatePoint === 'processing' && (
            <Dialog
              open={isCalculatePoint}
              onClose={() => setIsCalculatePoint(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <FlexBetween flexDirection="column" gap="1rem">
                  <Typography>{`Who's is the winner ???`}</Typography>

                  <FlexBetween gap="1rem">
                    <ButtonBase onClick={() => handleVote(offerId)}>
                      {roomData?.offerDisplayName}
                    </ButtonBase>
                    <Typography>⚔️</Typography>
                    <ButtonBase onClick={() => handleVote(answerId)}>
                      {roomData?.answerDisplayName}
                    </ButtonBase>
                  </FlexBetween>
                </FlexBetween>
              </DialogTitle>
            </Dialog>
          )}

          {/*PAGE CONTENT*/}
          <FlexBetween
            gap="0.5rem"
            className="bg-slate-800 w-screen h-screen overflow-y-auto lg:flex-row flex-col p-2"
          >
            <FlexBetween
              flexDirection="column"
              className="lg:basis-3/4 lg:h-full w-full"
              sx={{ borderRadius: '0.5rem' }}
            >
              <FlexBetween gap="0.5rem" className="w-full h-[65vh] mb-2 lg:flex-row flex-col">
                <Box className="lg:basis-3/4 w-full lg:h-full h-[40vh] relative">
                  {currentVideo && (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full rounded-lg"
                        src={currentVideo}
                        type="video/mp4"
                        onEnded={handleEndVideo}
                        muted
                      />

                      {roomData?.battleStatus === 'recordProcessing' && (
                        <Box
                          className="absolute top-0 w-full lg:h-full h-[40vh] z-10 flex items-center justify-center"
                          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: '700',
                              color: 'rgba(255, 255, 255, 0.75)',
                              textAlign: 'center'
                            }}
                          >
                            Video processing
                            <br />
                            <CircularProgress
                              sx={{
                                fontSize: '6rem',
                                fontWeight: '700',
                                color: 'rgba(255, 255, 255, 0.75)'
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>

                <FlexBetween
                  className="lg:basis-1/4 w-full lg:h-full h-[25vh] lg:flex-col flex-row"
                  gap="0.5rem"
                >
                  <FlexBetween className="bg-slate-800 basis-1/2 w-full h-full rounded-lg relative">
                    <UserCamera
                      videoTrack={tracks ? tracks[1] : offerUser?.videoTrack}
                      userName={tracks ? 'You' : roomData?.offerDisplayName}
                    />
                  </FlexBetween>

                  <FlexBetween className="bg-slate-800 basis-1/2 w-full h-full rounded-lg relative">
                    <UserCamera
                      videoTrack={answerUser?.videoTrack}
                      userName={
                        tracks
                          ? !isOfferUser
                            ? roomData?.offerDisplayName
                            : roomData?.answerDisplayName
                          : roomData?.answerDisplayName
                      }
                    />
                  </FlexBetween>
                </FlexBetween>
              </FlexBetween>

              <FlexBetween gap="0.5rem" className="bg-secondary w-full h-[33vh] p-2 rounded-lg">
                <Box className=" bg-slate-800 basis-[50%] w-full h-full rounded-lg">
                  {roomData?.lastRecord && (
                    <video
                      className="w-full h-full rounded-lg"
                      src={roomData?.lastRecord}
                      type="video/mp4"
                      controls
                    />
                  )}
                </Box>

                {isDesktopScreen && (
                  <NextVideoSelect
                    videos={videos}
                    roomId={roomId}
                    roomData={roomData}
                    className="basis-[30%] h-full"
                  />
                )}

                <Box flexDirection="column" className="lg:basis-[20%] basis-[50%] h-full">
                  <Box className="w-full">
                    <FlexBetween className="w-full">
                      <Typography variant="h6">{roomData?.offerDisplayName}</Typography>
                      <Typography variant="h6">{roomData?.offerPoint} ⭐</Typography>
                    </FlexBetween>

                    <FlexBetween className="w-full">
                      <Typography variant="h6">{roomData?.answerDisplayName}</Typography>
                      <Typography variant="h6">{roomData?.answerPoint} ⭐</Typography>
                    </FlexBetween>
                  </Box>

                  {(isOfferUser || isAnswerUser) && (
                    <>
                      <FlexBetween gap="0.5rem">
                        <ButtonBase
                          sx={{
                            width: '100%',
                            py: '0.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#fff',
                            backgroundColor: '#6aa6fa'
                          }}
                          onClick={handleBattleControl}
                        >
                          {roomData?.battleStatus === 'playing' ? 'Pause dual' : 'Start dual'}
                        </ButtonBase>

                        <ButtonBase
                          sx={{
                            width: '100%',
                            py: '0.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#fff',
                            backgroundColor: 'red'
                          }}
                          onClick={handleLeaveRoom}
                        >
                          End battle
                        </ButtonBase>
                      </FlexBetween>

                      {roomData?.lastRecord && (
                        <ButtonBase
                          sx={{
                            mt: '0.5rem',
                            width: '100%',
                            py: '0.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#fff',
                            backgroundColor: '#6aa6fa'
                          }}
                        >
                          <UploadFileIcon />
                          <Typography sx={{ fontWeight: '500' }}>Save last record</Typography>
                        </ButtonBase>
                      )}
                    </>
                  )}
                </Box>
              </FlexBetween>
            </FlexBetween>

            {isDesktopScreen ? (
              <Box className="bg-secondary lg:basis-1/4 h-full rounded-lg py-2">
                <ChatBox collectionName={`dual/${roomId}/messages`} messageList={messageList} />
              </Box>
            ) : (
              <FlexBetween className="bg-secondary w-full h-[35vh] rounded-lg p-2">
                {(isOfferUser || isAnswerUser) && (
                  <NextVideoSelect
                    videos={videos}
                    roomId={roomId}
                    roomData={roomData}
                    className="basis-1/2 h-full"
                  />
                )}

                <Box
                  className={
                    isOfferUser || isAnswerUser ? 'basis-1/2 w-full h-full' : 'w-full h-[35vh]'
                  }
                >
                  <ChatBox collectionName={`dual/${roomId}/messages`} messageList={messageList} />
                </Box>
              </FlexBetween>
            )}
          </FlexBetween>
        </>
      )}
    </>
  )
}

export default DualRoom
