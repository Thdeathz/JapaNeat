import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { VideoCard } from '~/components'
import { selectVideoIds } from '../VideoDetail/videosSlice'
import { useSelector } from 'react-redux'

export default function VideoList() {
  const videosIds = useSelector(selectVideoIds)

  return (
    <Box className="flex justify-center items-start">
      <Grid className="gap-6 desktop:max-w-[1200px] max-w-[904px]" container>
        {videosIds?.map(videoId => (
          <Grid key={videoId} item>
            <VideoCard videoId={videoId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
