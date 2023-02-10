import React, { useState } from 'react'
import {
  ConnectWithoutContact,
  EmojiEvents,
  EmojiEventsOutlined,
  Home,
  HomeOutlined,
  InterpreterMode,
  NoteAdd,
  Settings,
  SettingsOutlined,
  UploadFile,
  VideoCameraFront,
  VideoCameraFrontOutlined,
  VideoLibrary,
  VideoLibraryOutlined
} from '@mui/icons-material'
import { Divider, useMediaQuery } from '@mui/material'
import { SettingModal } from '~/components'
import LeftBarButtton from './LeftBarButtton'
import { useLocation, useNavigate } from 'react-router-dom'
import MusicWidget from './MusicWidget'

function LeftBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')

  const isHomePage = location.pathname === '/'
  const isVideosPage = location.pathname === '/videos'
  const isRecordsPage = location.pathname?.includes('record')
  const isRankingPage = location.pathname === '/ranking'

  const musicAchivement = JSON.parse(localStorage.getItem('currentAchievements'))?.filter(
    each => Number(each.type) === 0
  )

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      {isDesktopScreen && currentUser.role != '0' && musicAchivement?.length !== 0 && (
        <>
          <MusicWidget musicData={musicAchivement[0]} />

          <Divider sx={{ width: '100%' }} />
        </>
      )}

      <LeftBarButtton title="Home" isActive={isHomePage} handleOnClick={() => navigate('/')}>
        <Home color={isHomePage ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <LeftBarButtton title="Blog">
        <ConnectWithoutContact
          color={false ? 'textPrimary' : 'black'}
          sx={{ fontSize: '1.5rem' }}
        />
      </LeftBarButtton>

      <LeftBarButtton
        title="Videos"
        isActive={isVideosPage}
        handleOnClick={() => navigate('/videos')}
      >
        <VideoLibrary color={isVideosPage ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <LeftBarButtton title="Seiyuu">
        <InterpreterMode color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <Divider sx={{ width: '100%' }} />

      <LeftBarButtton
        title="Records"
        isActive={isRecordsPage}
        handleOnClick={() => navigate('/records')}
      >
        <VideoCameraFront
          color={isRecordsPage ? 'textPrimary' : 'black'}
          sx={{ fontSize: '1.5rem' }}
        />
      </LeftBarButtton>

      <LeftBarButtton
        title="Ranking"
        isActive={isRankingPage}
        handleOnClick={() => navigate('/ranking')}
      >
        <EmojiEvents color={isRankingPage ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <LeftBarButtton title="Note">
        <NoteAdd color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <Divider sx={{ width: '100%' }} />

      {currentUser.role == '1' && (
        <LeftBarButtton title="Upload">
          <UploadFile color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
        </LeftBarButtton>
      )}

      <LeftBarButtton title="Setting" handleOnClick={() => setIsOpenModal(true)}>
        <Settings color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>
      <SettingModal openModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}

export default React.memo(LeftBar)
