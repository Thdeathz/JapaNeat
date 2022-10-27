import React, { useState } from 'react'
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromWatchinglist, getCurrentVideoId } from '~/pages/VideoDetail/videosSlice'
import { deleteRoomChat, getCurrentRoomId } from '~/pages/RoomChat/roomChatSlice'
import useFirestore from '~/hooks/useFirestore'
import { deleteDocument } from '~/firebase/services'
import Achievement from './Achievement'
import { useGetCurrentPointQuery } from './Achievement/achievementsSlice'
import CircularProgress from '@mui/material/CircularProgress'

export default function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoId = useSelector(getCurrentVideoId)
  const roomId = useSelector(getCurrentRoomId)
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))
  const { data: currentPoint, isLoading: pointLoading } = useGetCurrentPointQuery(
    currentUserData.id
  )

  const [anchorElNotifications, setAnchorElNotifications] = useState(false)
  const [anchorElPoint, setAnchorElPoint] = useState(false)

  const notifications = useFirestore('notifications').filter(noti => {
    if (currentUserData.role === 0) {
      return noti.teacherId === currentUserData.id
    } else if (currentUserData.role === 1) {
      return noti.offerId === currentUserData.id || noti.answerId === currentUserData.id
    }
  })

  const handleLiveVideoRoom = () => {
    if (videoId) {
      dispatch(
        deleteFromWatchinglist({
          videoId: videoId,
          userData: currentUserData
        })
      )
    }
    if (roomId) {
      dispatch(
        deleteRoomChat({
          videoId: videoId,
          roomId: roomId
        })
      )
    }
  }

  const handleOpenNotifications = () => {
    if (notifications.length !== 0) setAnchorElNotifications(true)
  }

  const handleNavigateToRecordDetail = async (recordId, notiId) => {
    setAnchorElNotifications(false)
    navigate(`/record/${recordId}`)
    if (currentUserData.role === 1) {
      await deleteDocument({
        collectionName: 'notifications',
        id: notiId
      })
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar className="flex justify-center">
        <Typography className="absolute left-[24px]" variant="h6" noWrap component="div">
          <Link to="/">JapaNeat</Link>
        </Typography>
        <Box className="flex flex-row justify-center items-center gap-16">
          <Link
            to="/"
            className="text-xl font-medium text-default hover:text-textHover"
            underline="none"
            onClick={handleLiveVideoRoom}
          >
            Home
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Videos
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Records
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Ranking
          </Link>
        </Box>
        <Box className="absolute right-[24px]">
          {!pointLoading && (
            <>
              <Button color="textDefault" onClick={() => setAnchorElPoint(true)}>
                {Number(currentPoint?.point)} 🚀
              </Button>
              <Menu
                className="mt-10 w-[30vw]"
                id="menu-achievements"
                anchorEl={anchorElPoint}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElPoint)}
                onClose={() => setAnchorElPoint(false)}
              >
                <Achievement />
              </Menu>
            </>
          )}
          <IconButton size="large" color="inherit" onClick={handleOpenNotifications}>
            <Badge badgeContent={Number(notifications.length)} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-notifications"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElNotifications)}
            onClose={() => setAnchorElNotifications(false)}
          >
            {notifications.map((noti, index) => (
              <MenuItem
                key={index}
                onClick={() => handleNavigateToRecordDetail(noti.recordId, noti.id)}
              >
                <Typography textAlign="center">{noti.message}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
