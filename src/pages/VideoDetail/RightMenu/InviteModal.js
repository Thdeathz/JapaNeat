import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFirestore from '~/hooks/useFirestore'
import { changeRoomStatus } from '~/pages/RoomChat/roomChatSlice'

function InviteModal({ currentUserData, videoId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const offerKaiwaList = useFirestore(`watchings/${videoId}/rooms`)
  const offerDualList = useFirestore(`dual`)

  const [openKaiwaModal, setOpenKaiwaModal] = useState(true)
  const [openDualModal, setOpenDualModal] = useState(true)

  const handleAcceptKaiwaInvite = async roomData => {
    dispatch(
      changeRoomStatus({
        collectionName: `watchings/${videoId}/rooms`,
        roomId: roomData.id,
        videoId: roomData.videoId
      })
    )

    navigate(`/room/${videoId}/${roomData.roomId}`)
  }

  const handleAcceptDualInvite = async roomData => {
    dispatch(
      changeRoomStatus({
        collectionName: `dual`,
        roomId: roomData.id,
        videoId: roomData.videoId
      })
    )

    navigate(`/dual/${roomData.offerId}/${roomData.answerId}/${roomData.roomId}`)
  }

  useEffect(() => {
    const handleOfferNavigate = () => {
      const room = offerKaiwaList.find(room => room.offerId === currentUserData.id)
      if (room?.status === 'accepted') {
        navigate(`/room/${videoId}/${room.roomId}`)
      }

      const dual = offerDualList.find(room => room.offerId === currentUserData.id)
      if (dual?.status === 'accepted') {
        navigate(`/dual/${dual.offerId}/${dual.answerId}/${dual.roomId}`)
      }
    }

    handleOfferNavigate()

    return () => {}
  }, [offerKaiwaList, offerDualList])

  return (
    <>
      {/* ACEPT INVITE MODAL */}
      {offerKaiwaList?.map(
        (room, index) =>
          room.answerId === Number(currentUserData.id) &&
          room.status === 'waitting' && (
            <Dialog
              key={index}
              open={openKaiwaModal}
              onClose={() => setOpenKaiwaModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {room.offerDisplayName} has invite you to kaiwa !!!
              </DialogTitle>
              <DialogActions>
                <Button color="secondaryBtn" onClick={() => setOpenKaiwaModal(false)}>
                  Disagree
                </Button>
                <Button color="primaryBtn" onClick={() => handleAcceptKaiwaInvite(room)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          )
      )}

      {/* ACEPT INVITE MODAL */}
      {offerDualList?.map(
        (room, index) =>
          room.answerId === Number(currentUserData.id) &&
          room.status === 'waitting' && (
            <Dialog
              key={index}
              open={openDualModal}
              onClose={() => setOpenDualModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {room.offerDisplayName} has invite you to a dual battle !!!
              </DialogTitle>
              <DialogActions>
                <Button color="secondaryBtn" onClick={() => setOpenDualModal(false)}>
                  Disagree
                </Button>
                <Button color="primaryBtn" onClick={() => handleAcceptDualInvite(room)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          )
      )}
    </>
  )
}

InviteModal.propTypes = {
  currentUserData: PropTypes.object.isRequired,
  videoId: PropTypes.string.isRequired
}

export default React.memo(InviteModal)
