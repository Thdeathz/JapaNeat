import { Box, Button, FormControl, List, ListItem, OutlinedInput } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send'
import MessageList from './MessageList'

export default function ChatBox() {
  return (
    <Box className="flex flex-col justify-between h-full">
      <p className="text-center font-semibold text-2xl py-2 text-cardHeadline bg-cardBackground">
        Chat box
      </p>
      <List className="px-4" component="div">
        <MessageList sender={true} />
      </List>
      <FormControl className="">
        <Box className="flex flex-row">
          <OutlinedInput
            className="grow"
            id="message"
            autoComplete="off"
            placeholder="Enter message..."
          />
          <Button variant="contained" color="secondaryBtn">
            <SendIcon color="primary" />
          </Button>
        </Box>
      </FormControl>
    </Box>
  )
}
