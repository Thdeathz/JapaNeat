import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import BackgroundMusic from '../BackgroundMusic'
import FloatButton from '../FloatButton'
import Theme from '../Theme'
import { useGetAchievementsQuery } from './achievementsSlice'

export default function Achievement() {
  const { data: achievementList } = useGetAchievementsQuery()
  const [tabValue, setTabValue] = useState(0)

  return (
    <Box className="w-[50vw]">
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
    </Box>
  )
}
