import React from 'react'
import { Box, Grid } from '@mui/material'
import { Loading, VideoCard } from '~/components'
import { useGetVideosQuery } from '../VideoDetail/videosSlice'
import FilterArea from './FilterArea'

function Videos() {
  const { data: videos, isLoading } = useGetVideosQuery()

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FilterArea />
          <Box className="flex flex-col justify-center items-start sm:px-2 px-4 pb-4">
            <Grid className="lg:gap-4 gap-2" container>
              {videos.ids.map((videoId, index) => (
                <Grid
                  key={`video-list-${videoId}-${index}`}
                  item
                  className="2xl:w-[260px] xl:w-[23%] md:w-[32%] sm:w-[45%] w-full cursor-pointer relative"
                >
                  <VideoCard videoId={videoId} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  )
}

export default Videos
