import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase, Typography } from '@mui/material'
import { ArrowBackOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function BackArrowLayout({ children }) {
  const navigate = useNavigate()

  return (
    <>
      <Box className="px-5 py-2 absolute top-0 z-50">
        <ButtonBase
          sx={{
            px: '0.25rem',
            borderRadius: '0.25rem ',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)'
            }
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackOutlined sx={{ color: '#6aa6fa' }} />
          <Typography variant="h6" color="#6aa6fa">
            Back
          </Typography>
        </ButtonBase>
      </Box>
      <Box>{children}</Box>
    </>
  )
}

BackArrowLayout.propTypes = {
  children: PropTypes.element.isRequired
}
export default BackArrowLayout
