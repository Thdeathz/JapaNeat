import React from 'react'
import { Box, Grid } from '@mui/material'
import { Loading, NoData, VideoCard } from '~/components'
import { selectVideosByCategory, useGetVideosQuery } from '../VideoDetail/videosSlice'
import FilterArea from './FilterArea'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

function Videos() {
  const { isLoading } = useGetVideosQuery()
  const videos = useSelector(state => selectVideosByCategory(state, state.videos.filterCategory))

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {videos.length === 0 ? (
            <NoData title={`No video available now :((`} />
          ) : (
            <>
              <FilterArea />
              <Box className="flex flex-col justify-center items-start sm:px-2 px-4 pb-4">
                <Grid className="lg:gap-4 gap-2" container>
                  <AnimatePresence>
                    {videos.map((video, index) => (
                      <Grid
                        key={`video-list-${video.id}-${index}`}
                        item
                        className="2xl:w-[260px] xl:w-[23%] md:w-[32%] sm:w-[45%] w-full cursor-pointer relative"
                        component={motion.div}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <VideoCard videoId={video.id} />
                      </Grid>
                    ))}
                  </AnimatePresence>
                </Grid>
              </Box>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Videos
