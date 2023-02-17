import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { AgoraVideoPlayer } from 'agora-rtc-react'

function UserCamera({ videoTrack, userName }) {
  return (
    <>
      {videoTrack && (
        <AgoraVideoPlayer
          id="video-call"
          videoTrack={videoTrack}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        />
      )}

      <Typography variant="h6" className="absolute bottom-0 left-2" sx={{ color: '#6aa6fa' }}>
        {userName}
      </Typography>
    </>
  )
}

UserCamera.propTypes = {
  videoTrack: PropTypes.any,
  userName: PropTypes.string
}

export default React.memo(UserCamera)
