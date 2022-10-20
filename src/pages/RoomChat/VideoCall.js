import React from 'react'
import { Box, Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import images from '~/assets/images'

export default function VideoCall() {
  return (
    <Box className="h-full flex flex-col gap-4">
      <Box className="basis-3/4 flex flex-col gap-4 items-center ">
        <img className="basis-1/2 object-cover" src={images.demoImage} alt="Video" />
        <img className="basis-1/2 object-cover" src={images.demoImage} alt="Video" />
      </Box>
      <Box className="flex flex-col gap-4">
        <Button fullWidth variant="contained" startIcon={<CameraAltIcon />}>
          Open Camera
        </Button>
        <Button fullWidth variant="contained" startIcon={<EmergencyRecordingIcon />}>
          Start Recording
        </Button>
      </Box>
    </Box>
  )
}
