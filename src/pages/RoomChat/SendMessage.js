import React, { useState } from 'react'
import { Box, Button, FormControl, OutlinedInput } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { addDocument } from '~/firebase/services'
import { useParams } from 'react-router-dom'
import { serverTimestamp } from 'firebase/firestore'

export default function SendMessage() {
  const { videoId, roomId } = useParams()
  const [message, setMessage] = useState('')
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const handleSendMessage = async e => {
    e.preventDefault()

    await addDocument({
      collectionName: `watchings/${videoId}/rooms/${roomId}/messages`,
      data: {
        message: [currentUserData.id, message]
      }
    })
    setMessage('')
  }

  return (
    <FormControl className="">
      <Box className="flex flex-row">
        <OutlinedInput
          className="grow"
          id="message"
          autoComplete="off"
          placeholder="Enter message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button variant="contained" color="secondaryBtn" onClick={e => handleSendMessage(e)}>
          <SendIcon color="primary" />
        </Button>
      </Box>
    </FormControl>
  )
}
