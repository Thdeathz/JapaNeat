import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import NavBar from '../NavBar'
import FlexBetween from '../FlexBetween'
import LeftBar from '../LeftBar'

function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <FlexBetween sx={{ alignItems: 'flex-start' }} className="bg-[white] lg:gap-4 gap-1 relative">
        <Box className="lg:basis-2/12 sm:basis-1/12 basis-1/4 lg:px-4 px-1 pt-4 flex flex-col items-center gap-2 overflow-y-auto overflow-x-hidden sticky top-0">
          <LeftBar />
        </Box>
        <Box className="lg:basis-10/12 sm:basis-11/12 basis-3/4 w-full h-full">{children}</Box>
      </FlexBetween>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default DefaultLayout
