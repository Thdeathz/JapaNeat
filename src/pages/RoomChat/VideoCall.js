import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactMediaRecorder } from 'react-media-recorder'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { PropTypes } from 'prop-types'
import { Box, IconButton } from '@mui/material'
import { v4 } from 'uuid'
import { addDocument } from '~/firebase/services'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import LogoutIcon from '@mui/icons-material/Logout'
import CircularProgress from '@mui/material/CircularProgress'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import servers from '~/app/servers'
import uploadFile from '~/hooks/uploadFile'
import { useAddNewRecordMutation } from '../RecordDetail/recordsSlice'
import { deleteRoomChat } from './roomChatSlice'
import { useClient, useMicrophoneAndCameraTracks } from '~/agora/rtc'
import { AgoraVideoPlayer } from 'agora-rtc-react'
import { APP_ID } from '~/agora/config'
import useFirestore from '~/hooks/useFirestore'

const pc = new RTCPeerConnection(servers)

function VideoCall({ video }) {
  const { roomId, videoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const roomData = useFirestore(`watchings/${videoId}/rooms`, roomId)
  const [loading, setLoading] = useState(false)

  const client = useClient()
  const { ready, tracks } = useMicrophoneAndCameraTracks()
  const [remoteUser, setRemoteUser] = useState(null)
  const [start, setStart] = useState(false)

  const [webcamActive, setWebcamActive] = useState(true)
  const [micActive, setMicActive] = useState(true)

  const [addNewRecord] = useAddNewRecordMutation()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleOpenCamera = async () => {
    if (tracks.length !== 0) {
      console.log('=======> Tracks', tracks)
      await tracks[1].setEnabled(!webcamActive)
      setWebcamActive(!webcamActive)
    }
  }

  const handleOpenMic = async () => {
    if (tracks.length !== 0) {
      await tracks[0].setEnabled(!micActive)
      setMicActive(!micActive)
    }
  }

  const handleLeaveRoom = async () => {
    await client.leave()
    client.removeAllListeners()
    tracks[0].close()
    tracks[1].close()
    setStart(false)
    dispatch(
      deleteRoomChat({
        videoId: videoId,
        roomId: roomId
      })
    )
    navigate('/')
  }

  const handleUpload = async mediaBlobUrl => {
    setLoading(true)
    const blob = await fetch(mediaBlobUrl).then(r => r.blob())
    if (blob) {
      const file = new File([blob], String(v4()), { type: 'audio/wav' })
      if (file) {
        const path = await uploadFile(file)
        if (path) {
          try {
            const res = await addNewRecord({
              url: path,
              thumbnail: video.video.thumbnail,
              offer_id: roomData.offerId,
              answer_id: roomData.answerId,
              video_detail_id: video.id
            }).unwrap()
            pc.close()
            addDocument({
              collectionName: 'notifications',
              data: {
                teacherId: video.teacher.id,
                recordId: res.ids[0],
                message: `${roomData.offerDisplayName} need your feedback !!!`
              }
            })
            handleLeaveRoom()
            setLoading(false)
          } catch (error) {
            console.log(error)
          }
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
      await client.join(APP_ID, roomId, null, currentUser.id)

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

      if (tracks) await client.publish([tracks[0], tracks[1]])
      setStart(true)
    }

    if (ready && tracks) {
      initRoom()
    }

    if (!roomData) {
      handleLeaveRoom()
      toast.info('Your Kaiwa session is over !!!', {
        toastId: 1
      })
    }

    return () => {}
  }, [videoId, roomId, ready, tracks, roomData])

  return (
    <Box className="h-full flex flex-col gap-4">
      <Box className="basis-3/4 flex flex-col gap-4 items-center">
        <Box className="basis-1/2 w-full h-full object-cover bg-slate-800">
          {start && tracks && (
            <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} videoTrack={tracks[1]} />
          )}
        </Box>
        <Box className="basis-1/2 w-full h-full object-cover bg-slate-800">
          {remoteUser?.videoTrack && (
            <AgoraVideoPlayer
              style={{ height: '100%', width: '100%' }}
              videoTrack={remoteUser.videoTrack}
            />
          )}
        </Box>
      </Box>
      <Box className="flex flex-col gap-4">
        <Box className="flex justify-center items-center gap-4">
          <IconButton variant="contained" onClick={handleOpenCamera}>
            {webcamActive ? <CameraAltIcon /> : <NoPhotographyIcon />}
          </IconButton>
          <IconButton variant="contained" onClick={handleOpenMic}>
            {micActive ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <ReactMediaRecorder
            screen
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
              <>
                {status === 'idle' && (
                  <IconButton variant="contained" onClick={startRecording}>
                    <EmergencyRecordingIcon />
                  </IconButton>
                )}
                {status === 'recording' && (
                  <IconButton variant="contained" onClick={stopRecording}>
                    <RadioButtonCheckedIcon />
                  </IconButton>
                )}
                {status === 'stopped' && (
                  <IconButton
                    fullWidth
                    variant="contained"
                    onClick={() => handleUpload(mediaBlobUrl)}
                  >
                    {loading ? (
                      <CircularProgress color="textDefault" size={14} />
                    ) : (
                      <UploadFileIcon />
                    )}
                  </IconButton>
                )}
              </>
            )}
          />
          <IconButton variant="contained" onClick={handleLeaveRoom}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

VideoCall.propTypes = {
  video: PropTypes.object
}

export default VideoCall
