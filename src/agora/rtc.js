import AgoraRTC from 'agora-rtc-sdk-ng'
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'
import { APP_ID } from './config'
// import { RtcRole, RtcTokenBuilder } from 'agora-access-token'

// export const handleGenerateNewChannelToken = (channelName, uid) => {
//   const appId = process.env.AGORA_APP_ID
//   const appCertificate = process.env.AGORA_APP_CERTIFICATE

//   const expirationTimeInSeconds = 3600 * 24
//   const currentTimestamp = Math.floor(Date.now() / 1000)
//   const role = RtcRole.PUBLISHER
//   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

//   const token = RtcTokenBuilder.buildTokenWithUid(
//     appId,
//     appCertificate,
//     channelName,
//     role,
//     uid,
//     privilegeExpiredTs
//   )

//   return token
// }

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
