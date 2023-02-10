import React from 'react'
import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { Loading, VideoCard } from '~/components'
import { selectVideoIds, useGetVideosQuery } from '../VideoDetail/videosSlice'
import FilterArea from './FilterArea'

function Videos() {
  const { isLoading } = useGetVideosQuery()
  const videosIds = useSelector(selectVideoIds)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FilterArea />
          <Box className="flex flex-col justify-center items-start px-2">
            <Grid className="lg:gap-4 gap-2" container>
              {videosIds?.map(videoId => (
                <Grid
                  key={`video-list-${videoId}`}
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
