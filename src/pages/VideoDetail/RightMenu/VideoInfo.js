import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetRecordsByVideoIdQuery } from '~/pages/RecordDetail/recordsSlice'
import RelativeRecordCard from './RelativeRecordCard'

function VideoInfo({ videoDetail }) {
  const { videoId } = useParams()
  const { data: relativeRecords, isLoading } = useGetRecordsByVideoIdQuery(videoId)

  return (
    <Box className="h-full p-2 overflow-y-auto">
      <Box className="bg-white p-2 rounded-md mb-2">
        <Typography variant="h4" sx={{ fontWeight: '700' }}>
          {videoDetail.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: '400' }}>
          Author: {videoDetail.teacher.name}
        </Typography>
        <Typography className="mt-2 text-default text-base">{videoDetail.description}</Typography>
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Box className="flex flex-col gap-1">
          {relativeRecords.ids.map((id, index) => (
            <RelativeRecordCard
              key={`relative-record-${index}`}
              record={relativeRecords.entities[id]}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

VideoInfo.propTypes = {
  videoDetail: PropTypes.object.isRequired
}

export default VideoInfo
