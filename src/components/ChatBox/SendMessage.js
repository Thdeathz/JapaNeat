import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, FormControl, InputBase } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import FlexBetween from '../FlexBetween'
import { addDocument } from '~/firebase/services'

function SendMessage({ collectionName, userData, bottomRef }) {
  const [message, setMessage] = useState('')

  const handleSendMessage = async e => {
    e.preventDefault()

    setMessage('')

    if (message !== '') {
      await addDocument({
        collectionName,
        data: {
          userId: userData.id,
          userName: userData.name,
          message
        }
      })
    }

    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <FormControl className="w-full" sx={{ p: '0.5rem' }}>
      <FlexBetween className="bg-white rounded-lg" gap="0.5rem">
        <InputBase
          id="message"
          className=" grow"
          multiline
          autoComplete="off"
          placeholder="Enter message..."
          value={message}
          sx={{
            p: '0.5rem'
          }}
          onChange={e => setMessage(e.target.value)}
        />
        <ButtonBase
          sx={{ mr: '0.5rem', p: '0.5rem', borderRadius: '50%' }}
          onClick={e => handleSendMessage(e)}
        >
          <SendIcon />
        </ButtonBase>
      </FlexBetween>
    </FormControl>
  )
}

SendMessage.propTypes = {
  collectionName: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
  bottomRef: PropTypes.object.isRequired
}

export default React.memo(SendMessage)
