import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs
} from '@mui/material'
import { toast } from 'react-toastify'
import FloatButton from '~/components/FloatButton'
import BackgroundMusic from './BackgroundMusic'
import Theme from './Theme'

function SettingModal({ openModal, setOpenModal }) {
  const currentAchievement = JSON.parse(localStorage.getItem('currentAchievements'))
  const [tabValue, setTabValue] = useState(0)
  const [setting, setSetting] = useState({
    music: localStorage.getItem('music'),
    theme: null,
    cursor: localStorage.getItem('cursor'),
    floatButton: localStorage.getItem('floatButton')
  })

  const handleSetSetting = () => {
    if (setting.music) {
      localStorage.setItem('music', JSON.stringify(setting.music.url))
    } else if (localStorage.getItem('music')) {
      localStorage.removeItem('music')
    }
    if (setting.cursor) {
      const style = {
        cursor: `url(${setting.cursor.url}), auto`,
        'a, button:hover, video:hover': {
          cursor: `url(${setting.cursor.image}), pointer`
        }
      }
      localStorage.setItem('cursor', JSON.stringify(style))
    } else if (localStorage.getItem('cursor')) {
      localStorage.removeItem('cursor')
    }
    if (setting.floatButton) {
      localStorage.setItem('floatButton', JSON.stringify(setting.floatButton.image))
    } else if (localStorage.getItem('floatButton')) {
      localStorage.removeItem('floatButton')
    }
    setOpenModal(false)
    window.location.reload()
    toast.info('Your change had been save !!!', {
      toastId: 1
    })
  }

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>⚙️ Setting</DialogTitle>
      <DialogContent className="h-[40vh] w-[40vw] overflow-y-scroll">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={<p className="text-default">Background music</p>} id={0} />
            <Tab label={<p className="text-default">Theme</p>} id={1} />
            <Tab label={<p className="text-default">Float button</p>} id={2} />
          </Tabs>
        </Box>
        <Box hidden={tabValue !== 0} id={0}>
          {tabValue === 0 && (
            <BackgroundMusic
              currentAchievement={currentAchievement}
              setting={setting}
              setSetting={setSetting}
            />
          )}
        </Box>
        <Box hidden={tabValue !== 1} id={1}>
          {tabValue === 1 && (
            <Theme
              currentAchievement={currentAchievement}
              setting={setting}
              setSetting={setSetting}
            />
          )}
        </Box>
        <Box hidden={tabValue !== 2} id={2}>
          {tabValue === 2 && (
            <FloatButton
              currentAchievement={currentAchievement}
              setting={setting}
              setSetting={setSetting}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSetSetting}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SettingModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.any
}

export default React.memo(SettingModal)
