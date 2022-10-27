import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Box, Button, Card, CardActionArea, Grid, Paper } from '@mui/material'
import { selectAllAchievements } from './Achievement/achievementsSlice'

function Theme({ currentAchievement, setting, setSetting }) {
  const achievements = useSelector(selectAllAchievements)?.filter(
    achievement => achievement.type === 1
  )

  const handleSelectSetting = achievement => {
    if (!setting?.cursor?.id) {
      setSetting({ ...setting, cursor: achievement })
    } else {
      setSetting({ ...setting, cursor: null })
    }
  }

  return (
    <Box className="py-2 px-4">
      <h3 className="mb-3">Theme color</h3>
      <Grid container spacing={2}>
        {achievements?.map(achievement => {
          if (
            !Boolean(currentAchievement?.find(each => each.id == achievement.id)) &&
            !achievement.url
          ) {
            return (
              <Box key={achievement.id}>
                <Card className="m-4">
                  <CardActionArea>
                    <Paper className="w-[100px] h-[100px]" sx={{ backgroundColor: '#3da9fc' }} />
                  </CardActionArea>
                </Card>
              </Box>
            )
          }
        })}
      </Grid>
      <h3 className="mb-3">Cursor</h3>
      <Grid className="gap-8" container>
        {achievements?.map(achievement => {
          if (
            !Boolean(currentAchievement?.find(each => each.id == achievement.id)) &&
            !setting &&
            achievement.url &&
            achievement.image
          ) {
            return (
              <Box key={achievement.id}>
                <Button className="flex flex-col">
                  <Box className="flex flex-row">
                    <img src={achievement.url} />
                    <img src={achievement.image} />
                  </Box>
                  <p className="text-default">{`${achievement.require_point} 🚀`}</p>
                </Button>
              </Box>
            )
          } else if (
            Boolean(currentAchievement?.find(each => each.id == achievement.id)) &&
            setting &&
            achievement.url &&
            achievement.image
          ) {
            return (
              <Box className={setting?.cursor && 'border-lime-500 border-2'} key={achievement.id}>
                <Button className="flex flex-col" onClick={() => handleSelectSetting(achievement)}>
                  <Box className="flex flex-row">
                    <img src={achievement.url} />
                    <img src={achievement.image} />
                  </Box>
                </Button>
              </Box>
            )
          }
        })}
      </Grid>
    </Box>
  )
}

Theme.propTypes = {
  currentAchievement: PropTypes.array,
  setting: PropTypes.object,
  setSetting: PropTypes.func
}

export default Theme
