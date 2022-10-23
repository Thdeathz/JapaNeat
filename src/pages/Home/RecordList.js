import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { RecordCard } from '~/components'
import { useSelector } from 'react-redux'
import { selectRecordIds } from '../RecordDetail/recordsSlice'

export default function RecordList() {
  const recordIds = useSelector(selectRecordIds)

  return (
    <Box className="flex justify-center items-start">
      <Grid className="desktop:max-w-[1200px] max-w-[904px]" container spacing={2}>
        {recordIds.map(recordId => (
          <Grid key={recordId} item>
            <RecordCard recordId={recordId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
