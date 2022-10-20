import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Badge, Box, List, ListItem, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import { addDocument, getDocument } from '~/firebase/services'
import images from '~/assets/images'
import { useGetCurrentUserQuery } from '../Auth/authApiSlice'
import useFirestore from '~/hooks/useFirestore'
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '~/firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentVideoId, addToWatchinglist, getCurrentVideoId } from './videosSlice'

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
  const currentVideoId = useSelector(getCurrentVideoId)
  const userData = JSON.parse(localStorage.getItem('currentUser'))

  const watchingList = useFirestore(`watchings/${videoId}/members`)

  useEffect(() => {
    const handleAddUserToWatchingList = async () => {
      if (userData) {
        const checkAdded = await getDocument({
          collectionName: `watchings/${videoId}/members`
        })
        if (!checkAdded.find(user => user.id === userData.id) && !currentVideoId) {
          dispatch(
            addToWatchinglist({
              videoId: videoId,
              userData: userData
            })
          )
        }
      }
    }

    return handleAddUserToWatchingList
  }, [userData, videoId])

  return (
    <>
      <p className="text-center font-semibold text-2xl py-2 text-cardHeadline bg-cardBackground">
        Watching
      </p>
      <List component="div">
        {watchingList ? (
          watchingList.map(user => (
            <ListItem key={user.id} button onClick={() => navigate('/room')}>
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
                  <Avatar alt="avatar image" src={images.demoImage} />
                </StyledBadge>
                <h4 className="ml-4 text-xl text-default">{user?.userName}</h4>
                <CameraIndoorIcon />
              </Stack>
            </ListItem>
          ))
        ) : (
          <p>Get watching list</p>
        )}
      </List>
    </>
  )
}
