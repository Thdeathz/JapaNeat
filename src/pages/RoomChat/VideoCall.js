import React from 'react'
import { Box, Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import images from '~/assets/images'

export default function VideoCall() {
  return (
    <Box className="flex flex-col gap-4">
      <img className="h-full" src={images.demoImage} alt="Video" />
      <img className="h-full" src={images.demoImage} alt="Video" />
      <Button variant="contained" startIcon={<CameraAltIcon />}>
        Open Camera
      </Button>
      <Button variant="contained" startIcon={<EmergencyRecordingIcon />}>
        Start Recording
      </Button>
    </Box>
  )
}
