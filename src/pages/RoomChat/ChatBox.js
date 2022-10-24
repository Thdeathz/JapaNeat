import { Box } from '@mui/material'
import React from 'react'
import MessageList from './MessageList'
import { useParams } from 'react-router-dom'
import useFirestore from '~/hooks/useFirestore'
import SendMessage from './SendMessage'

export default function ChatBox() {
  const { videoId, roomId } = useParams()
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const messageList = useFirestore(`watchings/${videoId}/rooms/${roomId}/messages`)

  return (
    <Box className="flex flex-col justify-between h-full">
      {console.log('dafasdfasd: ', messageList)}
      <p className="text-center font-semibold text-2xl py-2 text-cardHeadline bg-cardBackground">
        Chat box
      </p>
      <Box className="flex flex-col gap-4 h-full px-2 py-4 overflow-y-scroll">
        {messageList.map((message, index) => (
          <MessageList
            key={index}
            sender={message.message[0] === currentUserData.id}
            message={message.message[1]}
          />
        ))}
      </Box>
      <SendMessage />
    </Box>
  )
}
