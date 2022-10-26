import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import { Box, Stack } from '@mui/material'
import { RightBar } from './RightBar'

function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <Stack className="p-2 relative" direction="row" spacing={2} justifyContent="space-between">
        <Box flex={1} color="secondary"></Box>
        <Box flex={10}>{children}</Box>
        <Box className="flex flex-col items-center gap-4" flex={1}>
          <RightBar />
        </Box>
      </Stack>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default DefaultLayout
