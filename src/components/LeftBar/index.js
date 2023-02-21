import React, { useState } from 'react'
import {
  EmojiEvents,
  LiveTvOutlined,
  NoteAdd,
  Settings,
  UploadFile,
  VideoCameraFront,
  VideoLibrary
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

  const isVideosPage = location.pathname === '/videos'
  const isRecordsPage = location.pathname?.includes('record')
  const isBattlesPage = location.pathname === '/battles'
  const isRankingPage = location.pathname === '/ranking'

  const musicAchivement = localStorage.getItem('music')

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      {isDesktopScreen && currentUser.role != '0' && musicAchivement && (
        <>
          <MusicWidget musicData={JSON.parse(musicAchivement)} />

          <Divider sx={{ width: '100%' }} />
        </>
      )}
      <LeftBarButtton
        title="Videos"
        isActive={isVideosPage}
        handleOnClick={() => navigate('/videos')}
      >
        <VideoLibrary color={isVideosPage ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <LeftBarButtton
        title="Dual battle"
        isActive={isBattlesPage}
        handleOnClick={() => navigate('/battles')}
      >
        <LiveTvOutlined
          color={isBattlesPage ? 'textPrimary' : 'black'}
          sx={{ fontSize: '1.5rem' }}
        />
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

      {currentUser.role == '0' && (
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
