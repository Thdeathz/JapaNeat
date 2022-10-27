import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Card, CardActionArea, Grid, Paper } from '@mui/material'
import { selectAllAchievements } from './Achievement/achievementsSlice'

export default function Theme() {
  const achievements = useSelector(selectAllAchievements)?.filter(
    achievement => achievement.type === 1
  )

  return (
    <Box className="py-2 px-4">
      <h3 className="mb-3">Theme color</h3>
      <Grid container spacing={2}>
        {achievements?.map(achievement => {
          return (
            <Card key={achievement.id} className="m-4">
              <CardActionArea>
                <Paper className="w-[100px] h-[100px]" sx={{ backgroundColor: '#3da9fc' }} />
              </CardActionArea>
            </Card>
          )
        })}
      </Grid>
      <h3 className="mb-3">Cursor</h3>
      <Grid className="gap-8" container>
        {achievements?.map(achievement => (
          <Button className="flex flex-col" key={achievement.id}>
            <Box className="flex flex-row">
              <img src="https://cdn.custom-cursor.com/db/13717/32/memes-quby-pointer.png" />
              <img src="https://cdn.custom-cursor.com/db/13718/32/memes-quby-cursor.png" />
            </Box>
            <p className="text-default">{`${achievement.require_point} 🚀`}</p>
          </Button>
        ))}
      </Grid>
    </Box>
  )
}
