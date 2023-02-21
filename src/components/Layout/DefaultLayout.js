import React from 'react'
import PropTypes from 'prop-types'
import { Box, useMediaQuery } from '@mui/material'
import NavBar from '../NavBar'
import FlexBetween from '../FlexBetween'
import LeftBar from '../LeftBar'
import FootBar from '../FootBar'

function DefaultLayout({ children }) {
  const isDesktopScreen = useMediaQuery('(min-width: 640px)')

  return (
    <Box className="flex flex-col h-full w-full">
      <NavBar />
      <FlexBetween
        sx={{ alignItems: 'flex-start' }}
        className="bg-[white] grow lg:gap-4 gap-1 relative"
      >
        {isDesktopScreen && (
          <Box className="lg:basis-2/12 sm:basis-1/12 basis-1/4 lg:px-4 px-1 pt-4 flex flex-col items-center gap-2 overflow-y-auto overflow-x-hidden sticky top-0">
            <LeftBar />
          </Box>
        )}
        <Box className="lg:basis-10/12 sm:basis-11/12 w-full h-full">{children}</Box>
      </FlexBetween>
      {!isDesktopScreen && <FootBar />}
    </Box>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default DefaultLayout
