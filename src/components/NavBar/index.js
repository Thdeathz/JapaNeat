import React, { useState } from 'react'
import {
  Badge,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useFirestore from '~/hooks/useFirestore'
import { deleteDocument, getDocument } from '~/firebase/services'
import { deleteRoomChat } from '~/pages/RoomChat/roomChatSlice'
import UserMenu from './UserMenu'
import images from '~/assets/images'
import FlexBetween from '~/components/FlexBetween'
import Achievement from './Achievement'
import { useGetCurrentPointQuery } from './Achievement/achievementsSlice'
import SearchIcon from '@mui/icons-material/Search'

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: '50px',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

function NavBar() {
  const navigate = useNavigate()
  const isDesktopScreen = useMediaQuery('(min-width: 768px)')

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
    <Box className="bg-white border-b-[1px] border-[rgba(0,0,0,0.15)] ">
      <Toolbar className="flex justify-between items-center">
        <FlexBetween gap="2rem">
          <FlexBetween className="cursor-pointer" gap="0.5rem" onClick={() => navigate('/')}>
            <img src={images.logo} alt="logo" width={40} />
            <Typography variant="h6" color="#6aa6fa" noWrap component="div">
              JapaNeat
            </Typography>
          </FlexBetween>

          {isDesktopScreen && (
            <Box className="relative bg-secondary mr-2 rounded-2xl">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Box>
          )}
        </FlexBetween>

        <Box className="right-[24px]">
          {!pointLoading && currentUserData.role === 1 && (
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
          <UserMenu />
        </Box>
      </Toolbar>
    </Box>
  )
}

export default React.memo(NavBar)
