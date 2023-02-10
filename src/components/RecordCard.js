import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { selectRecordById } from '~/pages/RecordDetail/recordsSlice'
import { useNavigate } from 'react-router-dom'
import { selectVideoById } from '~/pages/VideoDetail/videosSlice'
import { MissedVideoCall } from '@mui/icons-material'

function RecordCard({ recordId }) {
  const navigate = useNavigate()

  const record = useSelector(state => selectRecordById(state, Number(recordId)))
  const video = useSelector(state => selectVideoById(state, Number(record.videoId)))

  return (
    <Card className="w-full">
      <CardActionArea onClick={() => navigate(`/record/${record.id}`)}>
        <CardMedia component="img" image={record.record.thumbnail} alt="video thumbnail" />
        <CardContent>
          <Box className="flex flex-row justify-between items-center pb-2">
            <Typography variant="h6" component="p" sx={{ fontWeight: '500' }}>
              {record.answer.name}
            </Typography>
            <Typography component="p">01/01/2000</Typography>
          </Box>
          <Box className="flex flex-row justify-between items-center border-t-2 py-2 px-1">
            <Box>
              <Typography gutterBottom component="p">
                {video?.category}
              </Typography>
              <Typography component="p">
                <MissedVideoCall /> {record.offer.name}
              </Typography>
            </Box>
            <Box className="text-right">
              <Typography gutterBottom component="p">
                N1
              </Typography>
              <Typography component="p">
                <QuestionAnswerIcon />
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

RecordCard.propTypes = {
  recordId: PropTypes.number
}

export default RecordCard
