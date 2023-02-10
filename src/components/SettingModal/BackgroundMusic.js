import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Avatar, Box, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { selectAllAchievements } from '../NavBar/Achievement/achievementsSlice'

function BackgroundMusic({ currentAchievement, setting, setSetting }) {
  const achievements = useSelector(selectAllAchievements)?.filter(
    achievement => achievement.type === 0
  )

  const handldeSelectSetting = achievement => {
    if (!setting?.music?.id) {
      setSetting({ ...setting, music: achievement })
    } else {
      setSetting({ ...setting, music: null })
    }
  }

  return (
    <Box className="py-2 px-4">
      <List className="w-full">
        {achievements.map(achievement => {
          if (!Boolean(currentAchievement?.find(each => each.id == achievement.id)) && !setting) {
            return (
              <Box key={achievement.id}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <img className="object-cover" src={achievement.image} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${achievement.name} 📻`}
                    secondary={`${achievement.require_point} 🚀`}
                  />
                </ListItemButton>
              </Box>
            )
          } else if (
            Boolean(currentAchievement?.find(each => each.id == achievement.id)) &&
            setting
          ) {
            return (
              <Box className={setting?.music && 'border-lime-500 border-2'} key={achievement.id}>
                <ListItemButton onClick={() => handldeSelectSetting(achievement)}>
                  <ListItemAvatar>
                    <Avatar>
                      <img className="object-cover" src={achievement.image} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${achievement.name} 📻`} />
                </ListItemButton>
              </Box>
            )
          }
        })}
      </List>
    </Box>
  )
}

BackgroundMusic.propTypes = {
  currentAchievement: PropTypes.array,
  setting: PropTypes.object,
  setSetting: PropTypes.func
}

export default BackgroundMusic
