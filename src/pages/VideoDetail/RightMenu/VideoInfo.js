import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

function VideoInfo({ videoDetail }) {
  return (
    <Box className="h-full px-2 py-4" flex={8} color="secondary">
      {console.log('==> video detail', videoDetail)}
      <Typography variant="h4" sx={{ fontWeight: '700' }}>
        {videoDetail.title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: '400' }}>
        Author: {videoDetail.teacher.name}
      </Typography>
      <Typography className="mt-2 text-default text-base">{videoDetail.description}</Typography>
    </Box>
  )
}

VideoInfo.propTypes = {
  videoDetail: PropTypes.object.isRequired
}

export default VideoInfo
