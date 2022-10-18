import { Box } from '@mui/material'
import React from 'react'
import images from '~/assets/images'

export default function VideoControl() {
  return (
    <Box className="flex flex-col gap-2">
      <img className="h-full" src={images.demoImage} alt="Video" />
      <Box className="h-full" flex={8} color="secondary">
        <Box className="flex justify-between items-center">
          <h1 className="font-bold text-default text-4xl">Video Tile</h1>
          <h1 className="text-xl">3 watching</h1>
        </Box>
        <p className="mt-2 text-default text-base">
          My goal with Happy Hues was to try to remove the issue where you know you like a color
          palette, but you are unsure about how to apply it to your design or illustration. I built
          this site to not only give you color inspiration, but also give you an example as to how
          and where you could use the colors.
        </p>
      </Box>
    </Box>
  )
}
