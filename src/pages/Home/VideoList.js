import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { VideoCard } from '~/components'

export default function VideoList() {
  return (
    <Box className="flex justify-center items-start">
      <Grid className="desktop:max-w-[1200px] max-w-[904px]" container spacing={2}>
        <Grid item>
          <VideoCard videoId={1} />
        </Grid>
        <Grid item>
          <VideoCard videoId={2} />
        </Grid>
        <Grid item>
          <VideoCard videoId={3} />
        </Grid>
        <Grid item>
          <VideoCard videoId={4} />
        </Grid>
        <Grid item>
          <VideoCard videoId={5} />
        </Grid>
        <Grid item>
          <VideoCard videoId={6} />
        </Grid>
        <Grid item>
          <VideoCard videoId={7} />
        </Grid>
        <Grid item>
          <VideoCard videoId={8} />
        </Grid>
      </Grid>
    </Box>
  )
}
