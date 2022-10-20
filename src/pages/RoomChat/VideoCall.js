import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import images from '~/assets/images'
import servers from '~/app/servers'
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '~/firebase/config'

const pc = new RTCPeerConnection(servers)

export default function VideoCall() {
  const { type, roomId, videoId } = useParams()
  const localRef = useRef(null)
  const remoteRef = useRef(null)

  const [webcamActive, setWebcamActive] = useState(false)

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

    if (type === 'offer') {
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
    } else if (type === 'answer') {
      pc.onicecandidate = event => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON())
      }

      const callData = (await getDoc(room)).data()

      const offerDescription = callData.offer
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

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
        })
      })
    }
  }

  return (
    <Box className="h-full flex flex-col gap-4">
      <Box className="basis-3/4 flex flex-col gap-4 items-center ">
        <video className="basis-1/2 object-cover" ref={localRef} autoPlay playsInline muted />
        <video className="basis-1/2 object-cover" ref={remoteRef} autoPlay playsInline />
      </Box>
      <Box className="flex flex-col gap-4">
        <Button
          fullWidth
          variant="contained"
          startIcon={<CameraAltIcon />}
          onClick={handleOpenCamera}
        >
          Open Camera
        </Button>
        <Button fullWidth variant="contained" startIcon={<EmergencyRecordingIcon />}>
          Start Recording
        </Button>
      </Box>
    </Box>
  )
}
