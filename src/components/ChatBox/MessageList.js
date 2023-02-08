import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

function MessageList({ sender, message }) {
  return (
    <Box display="flex" flexDirection="column" alignItems={sender ? 'flex-end' : 'flex-start'}>
      <Typography
        className="bg-hightlight py-2 px-4 max-w-[20vw] rounded-lg"
        sx={{ overflowWrap: 'break-word', backgroundColor: sender ? '#ffd803' : '#fffffe' }}
      >
        <span style={{ fontWeight: '700', color: '#6aa6fa' }}>{message.userName}</span>
        <br />
        {message.message}
      </Typography>
    </Box>
  )
}

MessageList.propTypes = {
  sender: PropTypes.bool,
  message: PropTypes.object.isRequired
}

export default React.memo(MessageList)
