import React, { useRef, useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SettingModal from './SettingModal'

const audioSrc =
  'https://firebasestorage.googleapis.com/v0/b/japaneat-525ab.appspot.com/o/audio%2FChill%20Work%20Music%20%E2%80%94%20Calm%20Focus%20Mix.mp3?alt=media&token=b6951ff2-1685-4420-8474-bfb05a6b6165'

export const RightBar = () => {
  const [playStatus, setPlayStatus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const audioEl = useRef()

  const handlePlayPause = () => {
    if (playStatus) {
      audioEl.current.pause()
      setPlayStatus(false)
      return
    }
    audioEl.current.play()
    setPlayStatus(true)
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'sticky', top: '70vh' }}
        icon={
          <>{playStatus ? <MusicNoteIcon /> : openModal ? <SettingsIcon /> : <SpeedDialIcon />}</>
        }
        direction="up"
      >
        <SpeedDialAction
          key={'music'}
          icon={
            <>
              {playStatus ? <PauseIcon /> : <PlayArrowIcon />}
              <audio ref={audioEl} src={audioSrc} />
            </>
          }
          tooltipTitle={'music'}
          onClick={handlePlayPause}
        />
        <SpeedDialAction
          key={'setting'}
          icon={<SettingsIcon />}
          tooltipTitle={'setting'}
          onClick={() => setOpenModal(true)}
        />
      </SpeedDial>
      <SettingModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}
