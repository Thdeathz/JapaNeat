import React from 'react'
import { Box, CardMedia, Paper, Stack } from '@mui/material'
import images from '~/assets/images'
import WatchingList from './WatchingList'
import { VideoCard } from '~/components'

export default function VideoDetail() {
  return (
    <>
      <Box className="flex justify-center">
        <Stack
          className="py-2 h-[80vh] desktop:w-[90vw]"
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Box className="h-full" flex={8} color="secondary">
            <img className="h-full" src={images.demoImage} alt="Video" />
          </Box>
          <Box className="bg-secondary h-full" flex={3}>
            <WatchingList />
          </Box>
        </Stack>
      </Box>
      <Box className="flex justify-center">
        <Stack
          className="py-2 desktop:w-[90vw]"
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Box className="h-full" flex={8} color="secondary">
            <Box className="flex justify-between items-center">
              <h1 className="font-bold text-default text-4xl">Video Tile</h1>
              <h1 className="text-xl">3 watching</h1>
            </Box>
            <p className="mt-2 text-default text-base">
              My goal with Happy Hues was to try to remove the issue where you know you like a color
              palette, but you are unsure about how to apply it to your design or illustration. I
              built this site to not only give you color inspiration, but also give you an example
              as to how and where you could use the colors.
            </p>
          </Box>
          <Box className="h-full flex flex-col items-center gap-4" flex={3}>
            <VideoCard />
            <VideoCard />
          </Box>
        </Stack>
      </Box>
    </>
  )
}
