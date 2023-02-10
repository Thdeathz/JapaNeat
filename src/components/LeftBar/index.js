import React, { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import {
  EmojiEventsOutlined,
  HomeOutlined,
  PauseCircleOutlineOutlined,
  PlayCircleOutlineOutlined,
  SettingsOutlined,
  VideoCameraFrontOutlined,
  VideoLibraryOutlined
} from '@mui/icons-material'
import { Box, ButtonBase, Divider, LinearProgress, Typography, useMediaQuery } from '@mui/material'
import { FlexBetween, SettingModal } from '~/components'
import LeftBarButtton from './LeftBarButtton'
import { useLocation, useNavigate } from 'react-router-dom'

function LeftBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const playMusicRef = useRef(null)
  const musicRef = useRef(null)
  const isHover = useHover(playMusicRef)

  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')
  const isHomePage = location.pathname === '/'
  const isVideosPage = location.pathname === '/videos'
  const isRecordspage = location.pathname === '/records'

  const musicAchivement = JSON.parse(localStorage.getItem('currentAchievements'))?.filter(
    each => Number(each.type) === 0
  )

  const [isPlayMusic, setIsPlayMusic] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handlePlayPause = () => {
    if (isPlayMusic) {
      musicRef.current.pause()
      setIsPlayMusic(false)
      return
    }
    musicRef.current.play()
    setIsPlayMusic(true)
  }

  return (
    <>
      {isDesktopScreen && musicAchivement.length !== 0 && (
        <>
          <Box
            sx={{
              width: '100%',
              p: '0.5rem 1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Box className="flex items-center gap-2">
              <ButtonBase
                className="relative"
                sx={{
                  borderRadius: '50%'
                }}
                ref={playMusicRef}
                onClick={handlePlayPause}
              >
                <img
                  className={
                    isPlayMusic
                      ? 'w-[50px] h-[50px] object-cover rounded-[50%] animate-spin-slow'
                      : 'w-[50px] h-[50px] object-cover rounded-[50%]'
                  }
                  src={musicAchivement[0].image}
                />
                {isHover && (
                  <FlexBetween
                    className="absolute top-0 left-0 w-full h-full"
                    sx={{ borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                  >
                    {isPlayMusic ? (
                      <PauseCircleOutlineOutlined
                        sx={{ color: 'white', flexGrow: 1, fontSize: '2rem' }}
                      />
                    ) : (
                      <PlayCircleOutlineOutlined
                        sx={{ color: 'white', flexGrow: 1, fontSize: '2rem' }}
                      />
                    )}
                  </FlexBetween>
                )}
              </ButtonBase>

              <Box>
                <Typography>{musicAchivement[0].name}</Typography>
                <LinearProgress variant="determinate" value={0.6} />
              </Box>

              <audio
                ref={musicRef}
                src={Boolean(musicAchivement[0].url) ? musicAchivement[0].url : null}
              />
            </Box>
          </Box>

          <Divider sx={{ width: '100%' }} />
        </>
      )}

      <LeftBarButtton title="Home" isActive={isHomePage} handleOnClick={() => navigate('/')}>
        <HomeOutlined color={isHomePage ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <LeftBarButtton
        title="Videos"
        isActive={isVideosPage}
        handleOnClick={() => navigate('/videos')}
      >
        <VideoLibraryOutlined
          color={isVideosPage ? 'textPrimary' : 'black'}
          sx={{ fontSize: '1.5rem' }}
        />
      </LeftBarButtton>

      <LeftBarButtton
        title="Records"
        isActive={isRecordspage}
        handleOnClick={() => navigate('/records')}
      >
        <VideoCameraFrontOutlined
          color={isRecordspage ? 'textPrimary' : 'black'}
          sx={{ fontSize: '1.5rem' }}
        />
      </LeftBarButtton>

      <Divider sx={{ width: '100%' }} />

      <LeftBarButtton title="Ranking">
        <EmojiEventsOutlined color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>

      <Divider sx={{ width: '100%' }} />

      <LeftBarButtton title="Setting" handleOnClick={() => setIsOpenModal(true)}>
        <SettingsOutlined color={false ? 'textPrimary' : 'black'} sx={{ fontSize: '1.5rem' }} />
      </LeftBarButtton>
      <SettingModal openModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}

export default React.memo(LeftBar)
