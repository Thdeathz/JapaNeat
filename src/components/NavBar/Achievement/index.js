import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import FloatButton from '~/components/FloatButton'
import BackgroundMusic from '~/components/RightBar/BackgroundMusic'
import Theme from '~/components/RightBar/Theme'
import { useGetAchievementsQuery } from './achievementsSlice'

export default function Achievement() {
  const { data: achievementList } = useGetAchievementsQuery()
  const [tabValue, setTabValue] = useState(0)
  const currentAchievement = JSON.parse(localStorage.getItem('currentAchievements'))

  return (
    <Box className="w-[30vw]">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={<p className="text-default">Background music</p>} id={0} />
          <Tab label={<p className="text-default">Theme</p>} id={1} />
          <Tab label={<p className="text-default">Float button</p>} id={2} />
        </Tabs>
      </Box>
      <Box hidden={tabValue !== 0} id={0}>
        {tabValue === 0 && <BackgroundMusic currentAchievement={currentAchievement} />}
      </Box>
      <Box hidden={tabValue !== 1} id={1}>
        {tabValue === 1 && <Theme currentAchievement={currentAchievement} />}
      </Box>
      <Box hidden={tabValue !== 2} id={2}>
        {tabValue === 2 && <FloatButton currentAchievement={currentAchievement} />}
      </Box>
    </Box>
  )
}
