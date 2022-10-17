import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import images from '~/assets/images'

export default function RecordCard() {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={images.demoImage} alt="green iguana" />
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
                <PersonIcon /> Thdeathz
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
