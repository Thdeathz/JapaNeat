import React from 'react'
import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { Loading, RecordCard } from '~/components'
import { selectRecordIds, useGetRecordsQuery } from '../RecordDetail/recordsSlice'

function Records() {
  const { isLoading } = useGetRecordsQuery()
  const recordIds = useSelector(selectRecordIds)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="flex flex-col justify-center items-start px-2 py-4">
          <Grid className="lg:gap-4 gap-2" container>
            {recordIds?.map(recordId => (
              <Grid
                key={`record-list-${recordId}`}
                item
                className="2xl:w-[260px] xl:w-[23%] md:w-[32%] sm:w-[45%] w-full cursor-pointer relative"
              >
                <RecordCard recordId={recordId} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default Records
