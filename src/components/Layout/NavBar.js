import React from 'react'
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromWatchinglist, getCurrentVideoId } from '~/pages/VideoDetail/videosSlice'
import { useGetCurrentUserQuery } from '~/pages/Auth/authApiSlice'

export default function NavBar() {
  const dispatch = useDispatch()
  const videoId = useSelector(getCurrentVideoId)
  const { data: userData } = useGetCurrentUserQuery()

  const handleLiveVideoRoom = () => {
    if (videoId) {
      dispatch(
        deleteFromWatchinglist({
          videoId: videoId,
          userData: userData
        })
      )
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar className="flex flex-row justify-between">
        <Typography variant="h6" noWrap component="div">
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
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
