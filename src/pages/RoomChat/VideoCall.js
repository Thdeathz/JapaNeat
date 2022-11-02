import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CircularProgress from '@mui/material/CircularProgress'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import servers from '~/app/servers'
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '~/firebase/config'
import { ReactMediaRecorder } from 'react-media-recorder'
import uploadFile from '~/hooks/uploadFile'
import { v4 } from 'uuid'
import { useAddNewRecordMutation } from '../RecordDetail/recordsSlice'
import { PropTypes } from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteRoomChat } from './roomChatSlice'
import { toast } from 'react-toastify'
import { addDocument } from '~/firebase/services'

const pc = new RTCPeerConnection(servers)

function VideoCall({ video }) {
  const { roomId, videoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const localRef = useRef(null)
  const remoteRef = useRef(null)

  const [roomData, setRoomData] = useState(null)
  const [webcamActive, setWebcamActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const [addNewRecord] = useAddNewRecordMutation()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleOpenCamera = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    localRef.current.srcObject = localStream
    const remoteStream = new MediaStream()

    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream)
    })

    pc.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track)
      })
    }

    localRef.current.srcObject = localStream
    remoteRef.current.srcObject = remoteStream

    setWebcamActive(true)

    const room = doc(db, `watchings/${videoId}/rooms`, String(roomId))
    const offerCandidates = collection(room, 'offerCandidates')
    const answerCandidates = collection(room, 'answerCandidates')

    const callData = (await getDoc(room)).data()

    if (!callData.offer) {
      pc.onicecandidate = event => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON())
      }

      const offerDescription = await pc.createOffer()
      await pc.setLocalDescription(offerDescription)

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
      }
      await updateDoc(room, { offer: { ...offer } })

      onSnapshot(room, snapshot => {
        const data = snapshot.data()
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer)
          pc.setRemoteDescription(answerDescription)
        }
      })

      onSnapshot(answerCandidates, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data())
            pc.addIceCandidate(candidate)
          }
        })
      })
    } else {
      pc.onicecandidate = event => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON())
      }

      const offerDescription = callData.offer
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

      // onSnapshot(room, snapshot => {
      //   const data = snapshot.data()
      //   if (!pc.currentRemoteDescription && data?.offer) {
      //     const offerDescription = new RTCSessionDescription(data.offer)
      //     pc.setRemoteDescription(offerDescription)
      //   }
      // })

      const answerDescription = await pc.createAnswer()
      await pc.setLocalDescription(answerDescription)

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp
      }

      await updateDoc(room, { answer: { ...answer } })

      onSnapshot(offerCandidates, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data = change.doc.data()
            pc.addIceCandidate(new RTCIceCandidate(data))
          }
          pc.onconnectionstatechange = event => {
            if (pc.connectionState === 'disconnected') {
              pc.close()
              localStream.getTracks().forEach(track => {
                if (track.readyState === 'live') {
                  track.stop()
                }
              })
              toast.info('Your Kaiwa session is over', {
                toastId: 1
              })
              navigate('/')
            }
          }
        })
      })
    }
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
            dispatch(
              deleteRoomChat({
                videoId: videoId,
                roomId: roomId
              })
            )
            navigate('/')
            setLoading(false)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }

  useEffect(() => {
    const fetchRoomData = async () => {
      // const remoteStream = new MediaStream()

      // pc.ontrack = event => {
      //   event.streams[0].getTracks().forEach(track => {
      //     remoteStream.addTrack(track)
      //   })
      // }

      // remoteRef.current.srcObject = remoteStream

      // const room = doc(db, `watchings/${videoId}/rooms`, String(roomId))
      // const offerCandidates = collection(room, 'offerCandidates')
      // const answerCandidates = collection(room, 'answerCandidates')

      // const callData = (await getDoc(room)).data()

      // console.log('Call data: ', callData)

      // if (callData.offerId === currentUser.id) {
      //   onSnapshot(room, snapshot => {
      //     const data = snapshot.data()
      //     if (!pc.currentRemoteDescription && data?.answer) {
      //       const answerDescription = new RTCSessionDescription(data.answer)
      //       pc.setRemoteDescription(answerDescription)
      //     }
      //   })

      //   onSnapshot(answerCandidates, snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       if (change.type === 'added') {
      //         const candidate = new RTCIceCandidate(change.doc.data())
      //         pc.addIceCandidate(candidate)
      //       }
      //     })
      //   })
      // } else if (callData.answerId === currentUser.id) {
      //   // const offerDescription = callData.offer
      //   // await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))
      //   onSnapshot(room, snapshot => {
      //     const data = snapshot.data()
      //     if (!pc.currentRemoteDescription && data?.offer) {
      //       const offerDescription = new RTCSessionDescription(data.offer)
      //       pc.setRemoteDescription(offerDescription)
      //     }
      //   })

      //   onSnapshot(offerCandidates, snapshot => {
      //     snapshot.docChanges().forEach(change => {
      //       if (change.type === 'added') {
      //         let data = change.doc.data()
      //         pc.addIceCandidate(new RTCIceCandidate(data))
      //       }
      //       // pc.onconnectionstatechange = event => {
      //       //   if (pc.connectionState === 'disconnected') {
      //       //     pc.close()
      //       //     localStream.getTracks().forEach(track => {
      //       //       if (track.readyState === 'live') {
      //       //         track.stop()
      //       //       }
      //       //     })
      //       //     toast.info('Your Kaiwa session is over', {
      //       //       toastId: 1
      //       //     })
      //       //     navigate('/')
      //       //   }
      //       // }
      //     })
      //   })
      // }

      onSnapshot(doc(db, `watchings/${videoId}/rooms`, String(roomId)), snapshot => {
        setRoomData(snapshot.data())
      })
    }

    return fetchRoomData
  }, [videoId, roomId])

  return (
    <Box className="h-full flex flex-col gap-4">
      <Box className="basis-3/4 flex flex-col gap-4 items-center">
        <video
          className="basis-1/2 object-cover bg-slate-800"
          ref={localRef}
          autoPlay
          playsInline
          muted
        />
        <video
          className="basis-1/2 object-cover bg-slate-800"
          ref={remoteRef}
          autoPlay
          playsInline
        />
      </Box>
      <Box className="flex flex-col gap-4">
        {!webcamActive ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<CameraAltIcon />}
            onClick={handleOpenCamera}
          >
            Open Camera
          </Button>
        ) : roomData?.offerId === currentUser.id ? (
          <ReactMediaRecorder
            screen
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
              <>
                {status === 'idle' && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<EmergencyRecordingIcon />}
                    onClick={startRecording}
                  >
                    Start Recording
                  </Button>
                )}
                {status === 'recording' && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RadioButtonCheckedIcon />}
                    onClick={stopRecording}
                  >
                    Stop Recording
                  </Button>
                )}
                {status === 'stopped' && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={
                      loading ? (
                        <CircularProgress color="textDefault" size={14} />
                      ) : (
                        <UploadFileIcon />
                      )
                    }
                    onClick={() => handleUpload(mediaBlobUrl)}
                  >
                    Upload Record
                  </Button>
                )}
              </>
            )}
          />
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

VideoCall.propTypes = {
  video: PropTypes.object
}

export default VideoCall
