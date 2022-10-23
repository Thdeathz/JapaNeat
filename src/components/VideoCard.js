import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { selectVideoById } from '~/pages/VideoDetail/videosSlice'

function VideoCard({ videoId }) {
  const navigate = useNavigate()
  const video = useSelector(state => selectVideoById(state, Number(videoId)))

  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea onClick={() => navigate(`/video/${videoId}`)}>
        <Box className="min-w-[280px] bg-secondary flex justify-center">
          <img className="h-[200px] object-contain" src={video.video.thumbnail} alt="video" />
        </Box>
        <CardContent>
          <Box className="flex flex-row justify-between items-center pb-2">
            <Typography variant="h5" component="p">
              {video.title}
            </Typography>
            <Typography component="p">23m views</Typography>
          </Box>
          <Box className="flex flex-row justify-between items-center border-t-2 py-2 px-1">
            <Box>
              <Typography gutterBottom component="p">
                {video.category}
              </Typography>
              <Typography component="p">
                <PersonIcon /> 23 watching
              </Typography>
            </Box>
            <Box className="text-right">
              <Typography gutterBottom component="p">
                N1
              </Typography>
              <Typography component="p">
                <LockIcon />
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

VideoCard.propTypes = {
  videoId: PropTypes.number
}

export default VideoCard
