import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ChatBubbleOutlined, InfoOutlined, PeopleAltOutlined } from '@mui/icons-material'
import { Box, CircularProgress, Slide, Snackbar, Typography } from '@mui/material'
import { ChatBox, FlexBetween, IconButton } from '~/components'
import VideoInfo from './VideoInfo'
import WatchingList from './WatchingList'
import { useParams } from 'react-router-dom'
import InviteModal from './InviteModal'

function RightMenu({ videoDetail }) {
  const { videoId } = useParams()
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const [currentTab, setCurrentTab] = useState('chat')
  const [openToast, setOpenToast] = useState(false)

  return (
    <>
      {/* WATTING TOAST */}
      <Snackbar
        open={openToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
        message={
          <Box className="flex flex-row justify-between items-center w-full">
            <CircularProgress size={14} color="inherit" />
            <p className="text-base pl-4">Waitting for the accept...</p>
          </Box>
        }
        key={currentUserData.id}
      />

      <InviteModal currentUserData={currentUserData} videoId={videoId} />

      {/* RIGHT MENU CONTENT */}
      <FlexBetween flexDirection="column" className="bg-secondary w-full h-full">
        <FlexBetween className="bg-white p-3 w-full lg:h-[6%] h-[10%]">
          <Typography
            variant="h6"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {currentTab === 'people'
              ? `Watching List`
              : currentTab === 'chat'
              ? 'Chat'
              : 'Infomation'}
          </Typography>

          <FlexBetween gap="0.5rem">
            <IconButton
              textDetail="People"
              style={{ fontSize: '1rem' }}
              isActive={currentTab === 'people'}
              handleOnClick={() => setCurrentTab('people')}
            >
              <PeopleAltOutlined
                sx={{ fontSize: '1.5rem', color: currentTab === 'people' && '#6aa6fa' }}
              />
            </IconButton>

            <IconButton
              textDetail="Chat"
              style={{ fontSize: '1rem' }}
              isActive={currentTab === 'chat'}
              handleOnClick={() => setCurrentTab('chat')}
            >
              <ChatBubbleOutlined
                sx={{ fontSize: '1.5rem', color: currentTab === 'chat' && '#6aa6fa' }}
              />
            </IconButton>

            <IconButton
              textDetail="More info"
              style={{ fontSize: '1rem' }}
              isActive={currentTab === 'info'}
              handleOnClick={() => setCurrentTab('info')}
            >
              <InfoOutlined
                sx={{ fontSize: '1.5rem', color: currentTab === 'info' && '#6aa6fa' }}
              />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <Box className="w-full lg:h-[94%] h-[90%]">
          {currentTab === 'people' ? (
            <WatchingList videoId={videoId} videoDetail={videoDetail} setOpenToast={setOpenToast} />
          ) : currentTab === 'chat' ? (
            <ChatBox collectionName={`watchings/${videoId}/messages`} />
          ) : (
            <VideoInfo videoDetail={videoDetail} />
          )}
        </Box>
      </FlexBetween>
    </>
  )
}

RightMenu.propTypes = {
  videoDetail: PropTypes.object.isRequired
}

export default React.memo(RightMenu)
