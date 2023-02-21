import {
  createBufferSourceAudioTrack,
  createClient,
  createMicrophoneAndCameraTracks
} from 'agora-rtc-react'

const APP_ID = process.env.REACT_APP_AGORA_APP_ID

export const useClient = createClient({ mode: 'rtc', codec: 'vp8' })

export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
  {},
  {
    encoderConfig: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 }
    }
  }
)

const handleCreateBufferSourceAudioTrack = client => {
  const bufferSource = createBufferSourceAudioTrack({
    codec: 'pcm'
  })

  const recordEngine = createRecordingEngine()

  return { bufferSource }
}

export const useVideoCall = client => {
  const initRoom = async (tracks, roomId, userId) => {
    let remoteUser = null

    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      if (mediaType === 'video') {
        remoteUser = user
      }
      if (mediaType === 'audio') {
        user.audioTrack.play()
      }
    })

    client.on('user-unpublished', (user, mediaType) => {
      if (mediaType === 'audio') {
        if (user.audioTrack) user.audioTrack.stop()
      }
      if (mediaType === 'video') {
        remoteUser = null
      }
    })

    client.on('user-left', user => {
      remoteUser = null
    })

    await client.join(APP_ID, roomId, null, userId)
    if (tracks) await client.publish([tracks[0], tracks[1]])

    return remoteUser
  }

  const leaveRoom = async tracks => {
    await client.leave()
    client.removeAllListeners()
    tracks[0].close()
    tracks[1].close()
  }

  return { initRoom, leaveRoom }
}

export const useAudioRecorder = handleCreateBufferSourceAudioTrack
