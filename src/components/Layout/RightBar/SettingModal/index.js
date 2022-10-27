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
import BackgroundMusic from '../../BackgroundMusic'
import Theme from '../../Theme'
import FloatButton from '../../FloatButton'

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function SettingModal({ openModal, setOpenModal }) {
  const [tabValue, setTabValue] = useState(0)

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
          {tabValue === 0 && <BackgroundMusic />}
        </Box>
        <Box hidden={tabValue !== 1} id={1}>
          {tabValue === 1 && <Theme />}
        </Box>
        <Box hidden={tabValue !== 2} id={2}>
          {tabValue === 2 && <FloatButton />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button color="secondary" onClick={() => setOpenModal(false)}>
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

export default SettingModal
