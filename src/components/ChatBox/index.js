import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FlexBetween from '../FlexBetween'
import { Box, Typography } from '@mui/material'
import SendMessage from './SendMessage'
import MessageList from './MessageList'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

function ChatBox({ collectionName }) {
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))
  const bottomRef = useRef(null)

  const ref = collection(useFirestore(), collectionName)
  const { status, data: messageList } = useFirestoreCollectionData(ref)

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <FlexBetween flexDirection="column" className="w-full h-full">
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        className="w-full px-2 pt-4 overflow-y-scroll"
        sx={{ overflow: 'auto' }}
      >
        {messageList?.map((message, index) => (
          <Box key={`message-list-${index}`}>
            {message.userId === -999 ? (
              <Box className="bg-cardHeadline max-w-[90%] py-2 px-4 rounded-lg">
                <Typography sx={{ fontWeight: '700', color: '#6aa6fa' }}>🤖 Admin</Typography>
                <Typography>
                  <span style={{ fontWeight: '500' }}>{message.userName}</span> {message.message}
                </Typography>
              </Box>
            ) : (
              <MessageList sender={message.userId === currentUserData.id} message={message} />
            )}
          </Box>
        ))}
        <Box ref={bottomRef}></Box>
      </Box>
      <SendMessage
        collectionName={collectionName}
        userData={currentUserData}
        bottomRef={bottomRef}
      />
    </FlexBetween>
  )
}

ChatBox.propTypes = {
  collectionName: PropTypes.string.isRequired
}

export default React.memo(ChatBox)
