import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase } from '@mui/material'

function LeftBarButton({ children, isActive = false, handleOnClick }) {
  return (
    <ButtonBase
      sx={{
        width: 'max-content',
        p: '0.25rem 0.75rem',
        borderRadius: '0.5rem',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)'
        }
      }}
      onClick={handleOnClick}
    >
      {children}
    </ButtonBase>
  )
}

LeftBarButton.propTypes = {
  children: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  handleOnClick: PropTypes.func
}

export default React.memo(LeftBarButton)
