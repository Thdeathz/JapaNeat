import React from 'react'
import { AppBar, Box, Divider, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MoreIcon from '@mui/icons-material/MoreVert'
import LeftBarButtton from '../LeftBar/LeftBarButtton'
import {
  EmojiEvents,
  LiveTvOutlined,
  NoteAdd,
  Settings,
  UploadFile,
  VideoCameraFront,
  VideoLibrary
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '../FlexBetween'
import FootBarButton from './FootBarButton'

function FootBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isVideosPage = location.pathname === '/videos'
  const isRecordsPage = location.pathname?.includes('record')
  const isBattlesPage = location.pathname === '/battles'
  const isRankingPage = location.pathname === '/ranking'

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <Box className="w-full fixed" sx={{ backgroundColor: 'white', top: 'auto', bottom: 0 }}>
      <FlexBetween
        sx={{ width: '100%', p: '0.75rem 2rem', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)' }}
      >
        <FootBarButton isActive={isVideosPage} handleOnClick={() => navigate('/videos')}>
          <VideoLibrary
            color={isVideosPage ? 'textPrimary' : 'black'}
            sx={{ fontSize: '1.5rem' }}
          />
        </FootBarButton>

        <FootBarButton isActive={isBattlesPage} handleOnClick={() => navigate('/battles')}>
          <LiveTvOutlined
            color={isBattlesPage ? 'textPrimary' : 'black'}
            sx={{ fontSize: '1.5rem' }}
          />
        </FootBarButton>

        <FootBarButton isActive={isRecordsPage} handleOnClick={() => navigate('/records')}>
          <VideoCameraFront
            color={isRecordsPage ? 'textPrimary' : 'black'}
            sx={{ fontSize: '1.5rem' }}
          />
        </FootBarButton>

        <FootBarButton isActive={isRankingPage} handleOnClick={() => navigate('/ranking')}>
          <EmojiEvents
            color={isRankingPage ? 'textPrimary' : 'black'}
            sx={{ fontSize: '1.5rem' }}
          />
        </FootBarButton>

        {currentUser.role == '0' && (
          <FootBarButton>
            <UploadFile color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
          </FootBarButton>
        )}
      </FlexBetween>
    </Box>
  )
}

export default FootBar
