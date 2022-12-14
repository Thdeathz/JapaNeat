import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  Slide,
  Snackbar,
  Stack
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import { v4 } from 'uuid'
import images from '~/assets/images'
import { getDocument } from '~/firebase/services'
import useFirestore from '~/hooks/useFirestore'
import { deleteFromWatchinglist } from './videosSlice'
import { changeRoomStatus, sendOffer } from '../RoomChat/roomChatSlice'
import AccountCircle from '@mui/icons-material/AccountCircle'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  }
}))

export default function WatchingList() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const dispatch = useDispatch()
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const [openToast, setOpenToast] = useState(false)
  const [openModal, setOpenModal] = useState(true)

  const watchingList = useFirestore(`watchings/${videoId}/members`)

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
    dispatch(
      deleteFromWatchinglist({
        videoId: videoId,
        userData: currentUserData
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

    return handleOfferNavigate()
  }, [currentUserData, offerList])

  return (
    <>
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
      <p className="text-center font-semibold text-2xl py-2 text-cardHeadline bg-cardBackground">
        Watching
      </p>
      <List component="div">
        {watchingList ? (
          watchingList.map(
            user =>
              Number(user.id) !== currentUserData.id && (
                <ListItem key={user.id} button onClick={() => handleSendOffer(user)}>
                  <Stack
                    className="w-full"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <AccountCircle />
                    </StyledBadge>
                    <h4 className="ml-4 text-xl text-default">{user?.userName}</h4>
                    <CameraIndoorIcon />
                  </Stack>
                </ListItem>
              )
          )
        ) : (
          <p>Get watching list</p>
        )}
      </List>
    </>
  )
}
