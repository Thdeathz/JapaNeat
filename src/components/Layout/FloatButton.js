import { Box, Button, Grid } from '@mui/material'
import React from 'react'

export default function FloatButton() {
  return (
    <Box className="py-2 px-4">
      <Grid className="gap-8" container>
        <Button className="flex flex-row">
          <img
            className="w-[80px] h-[80px] object-contain"
            src="https://firebasestorage.googleapis.com/v0/b/japaneat-525ab.appspot.com/o/floatButton%2Ftext-bubble-phase-flat-pixelated-260nw-488743813-removebg-preview.png?alt=media&token=27e42b3c-3933-4042-903d-4711b35b6cb9"
          />
          <p className="text-default">100 🚀</p>
        </Button>
        <Button className="flex flex-row">
          <img
            className="w-[80px] h-[80px] object-contain"
            src="https://firebasestorage.googleapis.com/v0/b/japaneat-525ab.appspot.com/o/floatButton%2F2-removebg-preview.png?alt=media&token=343d63d8-6c72-4c7e-a607-fd6dc952b8da"
          />
          <p className="text-default">100 🚀</p>
        </Button>
      </Grid>
    </Box>
  )
}
