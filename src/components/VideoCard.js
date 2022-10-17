import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import images from '~/assets/images'

export default function VideoCard() {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={images.demoImage} alt="green iguana" />
        <CardContent>
          <Box className="flex flex-row justify-between items-center pb-2">
            <Typography variant="h5" component="p">
              Video title
            </Typography>
            <Typography component="p">23m views</Typography>
          </Box>
          <Box className="flex flex-row justify-between items-center border-t-2 py-2 px-1">
            <Box>
              <Typography gutterBottom component="p">
                Category
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
