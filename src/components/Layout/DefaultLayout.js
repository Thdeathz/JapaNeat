import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import { Box, Stack } from '@mui/material'

function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <Stack className="py-2" direction="row" spacing={2} justifyContent="space-between">
        <Box flex={1} color="secondary">
          <h1>SideBar</h1>
        </Box>
        <Box flex={10}>{children}</Box>
        <Box flex={1}>
          <h1>RightBar</h1>
        </Box>
      </Stack>
      <div>Footer</div>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default DefaultLayout
