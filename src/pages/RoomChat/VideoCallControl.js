import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactMediaRecorder } from 'react-media-recorder'
import { useDispatch } from 'react-redux'
import { ButtonBase } from '@mui/material'
import { v4 } from 'uuid'
import { addDocument } from '~/firebase/services'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CircularProgress from '@mui/material/CircularProgress'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import uploadFile from '~/hooks/uploadFile'
import { useAddNewRecordMutation } from '../RecordDetail/recordsSlice'
import { deleteRoomChat } from './roomChatSlice'
import { FlexBetween } from '~/components'
import {
  CallEndOutlined,
  FiberManualRecordOutlined,
  InfoOutlined,
  MessageOutlined,
  MicOffOutlined,
  MicOutlined,
  VideocamOffOutlined,
  VideocamOutlined
} from '@mui/icons-material'

function VideoCallControl({ client, tracks, videoData, roomData }) {
  const { roomId, videoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isWebcamActive, setIsWebcamActive] = useState(true)
  const [isMicActive, setIsMicActive] = useState(true)
  const [loading, setLoading] = useState(false)

  const [addNewRecord] = useAddNewRecordMutation()

  const handleOpenCamera = async () => {
    if (tracks.length !== 0) {
      console.log('=======> Tracks', tracks)
      await tracks[1].setEnabled(!isWebcamActive)
      setIsWebcamActive(!isWebcamActive)
    }
  }

  const handleOpenMic = async () => {
    if (tracks.length !== 0) {
      await tracks[0].setEnabled(!isMicActive)
      setIsMicActive(!isMicActive)
    }
  }

  const handleLeaveRoom = async () => {
    await client.leave()
    client.removeAllListeners()
    tracks[0].close()
    tracks[1].close()
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
              thumbnail: videoData.video.thumbnail,
              offer_id: roomData.offerId,
              answer_id: roomData.answerId,
              video_detail_id: videoData.id
            }).unwrap()

            await addDocument({
              collectionName: 'notifications',
              data: {
                teacherId: videoData.teacher.id,
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

  return (
    <FlexBetween className="basis-1/12 w-full relative" sx={{ justifyContent: 'center' }}>
      <FlexBetween gap="0.75rem">
        <ButtonBase
          sx={{
            backgroundColor: isMicActive ? 'rgba(71, 85, 105, 1)' : 'rgba(255, 0, 0, 1)',
            p: '0.5rem',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: isMicActive ? 'rgba(71, 85, 105, 0.5)' : 'rgba(255, 0, 0, 0.5)'
            }
          }}
          onClick={handleOpenMic}
        >
          {isMicActive ? (
            <MicOutlined sx={{ color: 'white' }} />
          ) : (
            <MicOffOutlined sx={{ color: 'white' }} />
          )}
        </ButtonBase>

        <ButtonBase
          sx={{
            backgroundColor: isWebcamActive ? 'rgba(71, 85, 105, 1)' : 'rgba(255, 0, 0, 1)',
            p: '0.5rem',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: isWebcamActive ? 'rgba(71, 85, 105, 0.5)' : 'rgba(255, 0, 0, 0.5)'
            }
          }}
          onClick={handleOpenCamera}
        >
          {isWebcamActive ? (
            <VideocamOutlined sx={{ color: 'white' }} />
          ) : (
            <VideocamOffOutlined sx={{ color: 'white' }} />
          )}
        </ButtonBase>

        <ReactMediaRecorder
          screen
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <>
              <ButtonBase
                sx={{
                  backgroundColor: 'rgba(71, 85, 105, 1)',
                  p: '0.5rem',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'rgba(71, 85, 105, 0.5)'
                  }
                }}
                onClick={() =>
                  status === 'idle'
                    ? startRecording()
                    : status === 'recording'
                    ? stopRecording()
                    : handleUpload(mediaBlobUrl)
                }
              >
                {status === 'idle' && <FiberManualRecordOutlined sx={{ color: 'white' }} />}
                {status === 'recording' && <RadioButtonCheckedIcon sx={{ color: 'red' }} />}
                {status === 'stopped' && (
                  <>
                    {loading ? (
                      <CircularProgress color="textDefault" size={22} />
                    ) : (
                      <UploadFileIcon sx={{ color: 'white' }} />
                    )}
                  </>
                )}
              </ButtonBase>
            </>
          )}
        />

        <ButtonBase
          sx={{
            backgroundColor: 'rgba(255, 0, 0, 1)',
            p: '0.5rem 1rem',
            borderRadius: '1.5rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            }
          }}
          onClick={handleLeaveRoom}
        >
          <CallEndOutlined sx={{ color: 'white' }} />
        </ButtonBase>
      </FlexBetween>

      <FlexBetween className="absolute right-3" gap="0.25rem">
        <ButtonBase sx={{ p: '0.5rem', borderRadius: '50%' }}>
          <InfoOutlined sx={{ color: 'white' }} />
        </ButtonBase>

        <ButtonBase sx={{ p: '0.5rem', borderRadius: '50%' }}>
          <MessageOutlined sx={{ color: 'white' }} />
        </ButtonBase>
      </FlexBetween>
    </FlexBetween>
  )
}

VideoCallControl.propTypes = {
  client: PropTypes.object.isRequired,
  tracks: PropTypes.array,
  videoData: PropTypes.object.isRequired,
  roomData: PropTypes.any.isRequired
}

export default React.memo(VideoCallControl)
