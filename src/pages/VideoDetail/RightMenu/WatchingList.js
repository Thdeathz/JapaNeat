import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Box, ButtonBase, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { FlexBetween, Loading } from '~/components'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { getDocument } from '~/firebase/services'
import { sendOffer } from '~/pages/RoomChat/roomChatSlice'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid'

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

function WatchingList({ videoId, videoDetail, setOpenToast }) {
  const dispatch = useDispatch()

  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  const ref = collection(useFirestore(), 'watchings', videoId, 'members')
  const { status, data: watchingList } = useFirestoreCollectionData(ref)

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
      if (!checkAdded.find(room => room.answerId === Number(answerData.NO_ID_FIELD))) {
        dispatch(
          sendOffer({
            collectionName: `watchings/${videoId}/rooms`,
            roomId: v4(),
            videoId: Number(videoId),
            offerId: Number(currentUserData.id),
            offerDisplayName: currentUserData.name,
            answerId: Number(answerData.NO_ID_FIELD),
            answerDisplayName: answerData.userName
          })
        )
      }
    }
  }

  const handleStartBattle = async answerData => {
    if (currentUserData) {
      setOpenToast(true)
      const checkAdded = await getDocument(
        {
          collectionName: `dual`
        },
        {
          fieldName: 'offerId',
          operator: '==',
          compareValue: Number(currentUserData.id)
        }
      )
      if (!checkAdded.find(room => room.answerId === Number(answerData.NO_ID_FIELD))) {
        dispatch(
          sendOffer({
            collectionName: `dual`,
            roomId: v4(),
            videoId: Number(videoId),
            videoUrl: videoDetail.video.url,
            offerId: Number(currentUserData.id),
            offerDisplayName: currentUserData.name,
            answerId: Number(answerData.NO_ID_FIELD),
            answerDisplayName: answerData.userName,
            battleStatus: 'idle',
            calculatePoint: 'idle',
            offerPoint: 0,
            answerPoint: 0
          })
        )
      }
    }
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="0.25rem"
        className="w-full h-full p-2"
        sx={{
          overflow: 'auto'
        }}
      >
        {status === 'success' ? (
          watchingList.map(
            (user, index) =>
              Number(user.NO_ID_FIELD) !== currentUserData.id && (
                <Box
                  key={`watching-list-${user.NO_ID_FIELD}-${index}`}
                  sx={{
                    p: '0.4rem 0.6rem',
                    borderRadius: '0.25rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <FlexBetween className="w-full">
                    <FlexBetween gap="0.5rem">
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <AccountCircle />
                      </StyledBadge>
                      <Typography
                        variant="h6"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {user?.userName}
                      </Typography>
                    </FlexBetween>

                    <FlexBetween className="h-full">
                      <ButtonBase
                        className="h-full"
                        sx={{
                          p: '0.5rem 0.5rem 0.5rem 1rem',
                          borderTopLeftRadius: '0.5rem',
                          borderBottomLeftRadius: '0.5rem',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
                        }}
                        onClick={() => handleSendOffer(user)}
                      >
                        <Typography
                          variant="h8"
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}
                        >
                          K🗣️iwa
                        </Typography>
                      </ButtonBase>

                      <ButtonBase
                        className="h-full"
                        sx={{
                          p: '0.5rem 1rem 0.5rem 0.5rem',
                          borderTopRightRadius: '0.5rem',
                          borderBottomRightRadius: '0.5rem',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
                        }}
                        onClick={() => handleStartBattle(user)}
                      >
                        <Typography
                          variant="h8"
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}
                        >
                          B⚔️ttle
                        </Typography>
                      </ButtonBase>
                    </FlexBetween>
                  </FlexBetween>
                </Box>
              )
          )
        ) : (
          <Loading />
        )}
      </Box>
    </>
  )
}

WatchingList.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoDetail: PropTypes.object.isRequired,
  setOpenToast: PropTypes.func.isRequired
}

export default React.memo(WatchingList)
