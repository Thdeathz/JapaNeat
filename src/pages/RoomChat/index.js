import { Box, Stack } from '@mui/material'
import React from 'react'
import ChatBox from './ChatBox'
import VideoControl from './VideoControl'
import VideoCall from './VideoCall'

export default function RoomChat() {
  return (
    <Box className="flex justify-center">
      <Stack
        className="py-2 h-[80vh] desktop:w-[90vw]"
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Box className="h-full" flex={9} color="secondary">
          <VideoControl />
        </Box>
        <Box className="h-full" flex={3} color="secondary">
          <VideoCall />
        </Box>
        <Box className="bg-secondary h-full" flex={4}>
          <ChatBox />
        </Box>
      </Stack>
    </Box>
  )
}
