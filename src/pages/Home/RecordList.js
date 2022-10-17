import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { RecordCard } from '~/components'

export default function RecordList() {
  return (
    <Box className="flex justify-center items-start">
      <Grid className="desktop:max-w-[1200px] max-w-[904px]" container spacing={2}>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
        <Grid item>
          <RecordCard />
        </Grid>
      </Grid>
    </Box>
  )
}
