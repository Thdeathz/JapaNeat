import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ChatBubbleOutlined, InfoOutlined, PeopleAltOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Snackbar,
  Typography
} from '@mui/material'
import { ChatBox, FlexBetween, IconButton } from '~/components'
import VideoInfo from './VideoInfo'
import WatchingList from './WatchingList'
import useFirestore from '~/hooks/useFirestore'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeRoomStatus, sendOffer } from '~/pages/RoomChat/roomChatSlice'
import { v4 } from 'uuid'
import { getDocument } from '~/firebase/services'

function RightMenu({ videoDetail }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { videoId } = useParams()
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const [currentTab, setCurrentTab] = useState('chat')
  const [openModal, setOpenModal] = useState(true)
  const [openToast, setOpenToast] = useState(false)

  const watchingList = useFirestore(`watchings/${videoId}/members`)
  const messageList = useFirestore(`watchings/${videoId}/messages`)
  const offerList = useFirestore(`watchings/${videoId}/rooms`)

  const handleSendOffer = async answerData => {
    if (currentUserData) {
      setOpenToast(true)
      const checkAdded = await getDocument(
        {
          collectionName: `watchings/${videoId}/rooms`
        },
        {
          fieldName: 'offerId',
          operator: '==',
          compareValue: Number(currentUserData.id)
        }
      )
      if (!checkAdded.find(room => room.answerId === Number(answerData.id))) {
        dispatch(
          sendOffer({
            roomId: v4(),
            videoId: Number(videoId),
            offerId: Number(currentUserData.id),
            offerDisplayName: currentUserData.name,
            answerId: Number(answerData.id),
            answerDisplayName: answerData.userName
          })
        )
      }
    }
  }

  const handleAccept = async roomData => {
    dispatch(
      changeRoomStatus({
        roomId: roomData.id,
        videoId: roomData.videoId
      })
    )
    navigate(`/room/${videoId}/${roomData.roomId}`)
  }

  useEffect(() => {
    const handleOfferNavigate = () => {
      const room = offerList.find(room => room.offerId === currentUserData.id)
      if (room?.status === 'accepted') {
        navigate(`/room/${videoId}/${room.roomId}`)
      }
    }

    handleOfferNavigate()

    return () => {}
  }, [offerList])

  return (
    <>
      {console.log('re-render right menu')}
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

      {/* ACEPT INVITE MODAL */}
      {offerList?.map(
        (room, index) =>
          room.answerId === Number(currentUserData.id) &&
          room.status === 'waitting' && (
            <Dialog
              key={index}
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {room.offerDisplayName} has invite you to kaiwa !!!
              </DialogTitle>
              <DialogActions>
                <Button color="secondaryBtn" onClick={() => setOpenModal(false)}>
                  Disagree
                </Button>
                <Button color="primaryBtn" onClick={() => handleAccept(room)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          )
      )}

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
            <WatchingList watchingList={watchingList} handleSendOffer={handleSendOffer} />
          ) : currentTab === 'chat' ? (
            <ChatBox collectionName={`watchings/${videoId}/messages`} messageList={messageList} />
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
