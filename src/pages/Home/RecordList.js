import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FilterArea, RecordCard } from '~/components'
import { useSelector } from 'react-redux'
import { selectRecordIds } from '../RecordDetail/recordsSlice'

export default function RecordList() {
  const recordIds = useSelector(selectRecordIds)

  return (
    <Box className="flex flex-col justify-center items-start">
      {recordIds && <FilterArea type="Records" />}
      <Grid className="gap-6 desktop:max-w-[1200px] max-w-[904px]" container>
        {recordIds?.map(recordId => (
          <Grid key={recordId} item>
            <RecordCard recordId={recordId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
