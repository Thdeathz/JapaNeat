import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { selectRecordById } from '~/pages/RecordDetail/recordsSlice'
import { useNavigate } from 'react-router-dom'

function RecordCard({ recordId }) {
  const navigate = useNavigate()
  const record = useSelector(state => selectRecordById(state, Number(recordId)))

  return (
    <Card className="h-full max-w-[280px]">
      <CardActionArea onClick={() => navigate(`/record/${record.id}`)}>
        <Box className="min-w-[280px] h-full bg-secondary flex justify-center">
          <img className="h-[200px] object-contain" src={record.record.thumbnail} alt="video" />
        </Box>
        <CardContent>
          <Box className="flex flex-row justify-between items-center pb-2">
            <Typography variant="h5" component="p">
              Record title
            </Typography>
            <Typography component="p">01/01/2000</Typography>
          </Box>
          <Box className="flex flex-row justify-between items-center border-t-2 py-2 px-1">
            <Box>
              <Typography gutterBottom component="p">
                Category
              </Typography>
              <Typography component="p">
                <PersonIcon /> {record.offer}
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
