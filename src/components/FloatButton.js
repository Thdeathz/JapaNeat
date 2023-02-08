import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'
import { selectAllAchievements } from './NavBar/Achievement/achievementsSlice'

function FloatButton({ currentAchievement, setting, setSetting }) {
  const floatButton = useSelector(selectAllAchievements)?.filter(
    achievement => achievement.type === 2
  )

  const handldeSelectSetting = achievement => {
    if (!setting?.floatButton?.id) {
      setSetting({ ...setting, floatButton: achievement })
    } else {
      setSetting({ ...setting, floatButton: null })
    }
  }

  return (
    <Box className="py-2 px-4">
      <Grid className="gap-8" container>
        {floatButton?.map(achievement => {
          if (!Boolean(currentAchievement?.find(each => each.id == achievement.id)) && !setting) {
            return (
              <Button key={achievement.id} className="flex flex-row">
                <img className="w-[80px] h-[80px] object-contain" src={achievement.image} />
                <p className="text-default">{achievement.require_point} 🚀</p>
              </Button>
            )
          } else if (
            Boolean(currentAchievement?.find(each => each.id == achievement.id)) &&
            setting
          ) {
            return (
              <Button
                key={achievement.id}
                sx={
                  setting?.floatButton && {
                    border: '2px solid rgb(132 204 22)'
                  }
                }
                onClick={() => handldeSelectSetting(achievement)}
              >
                <img className="w-[80px] h-[80px] object-contain" src={achievement.image} />
              </Button>
            )
          }
        })}
      </Grid>
    </Box>
  )
}

FloatButton.propTypes = {
  currentAchievement: PropTypes.array,
  setting: PropTypes.object,
  setSetting: PropTypes.func
}

export default FloatButton
