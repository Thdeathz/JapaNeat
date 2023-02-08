import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import useHoverDelay from '~/hooks/useHoverDelay'
import { selectVideoById } from '~/pages/VideoDetail/videosSlice'

function VideoCard({ videoId }) {
  const navigate = useNavigate()
  const video = useSelector(state => selectVideoById(state, Number(videoId)))

  const cardRef = useRef(null)
  const isHover = useHoverDelay(cardRef)

  return (
    <Card
      className={isHover ? 'absolute top-[-10%] left-[-10%] w-[120%] h-[120%] z-10' : 'w-full'}
      ref={cardRef}
    >
      <CardActionArea onClick={() => navigate(`/video/${videoId}`)}>
        <CardMedia component="img" image={video.video.thumbnail} alt="video thumbnail" />
        <CardContent>
          <Box className="flex flex-row justify-between items-center pb-2">
            <Typography variant="h5" component="p" sx={{ fontWeight: '500' }}>
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
