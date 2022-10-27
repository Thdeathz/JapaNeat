import { Avatar, Box, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { selectAllAchievements, useGetAchievementsQuery } from './Achievement/achievementsSlice'
import { useSelector } from 'react-redux'

export default function BackgroundMusic() {
  const achievements = useSelector(selectAllAchievements)?.filter(
    achievement => achievement.type === 0
  )

  return (
    <Box className="py-2 px-4">
      <List className="w-full">
        {achievements.map(achievement => {
          return (
            <ListItemButton key={achievement.id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={achievement.image} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${achievement.name} 📻`}
                secondary={`${achievement.require_point} 🚀`}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}
