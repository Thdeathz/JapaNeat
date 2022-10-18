import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from '@mui/material'

function MessageList({ sender }) {
  return sender ? (
    <ListItem className="bg-hightlight max-w-[75%] text-right float-right rounded-lg">
      Sender
    </ListItem>
  ) : (
    <ListItem className="bg-cardHeadline max-w-[75%] text-left float-left">
      <p>Reciver</p>
    </ListItem>
  )
}

MessageList.propTypes = {
  sender: PropTypes.bool
}

export default MessageList
