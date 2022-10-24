import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

function MessageList({ sender, message }) {
  return sender ? (
    <Box className="flex justify-end">
      <p className="bg-hightlight py-2 px-4 max-w-[75%] rounded-lg">{message}</p>
    </Box>
  ) : (
    <Box className="flex justify-start">
      <p className="bg-cardHeadline py-2 px-4 max-w-[75%] rounded-lg">{message}</p>
    </Box>
  )
}

MessageList.propTypes = {
  sender: PropTypes.bool,
  message: PropTypes.string
}

export default MessageList
