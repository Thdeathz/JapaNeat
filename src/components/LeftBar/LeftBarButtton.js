import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase, Typography, useMediaQuery } from '@mui/material'

function LeftBarButton({ children, title, isActive = false, handleOnClick }) {
  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')

  return (
    <ButtonBase
      sx={{
        width: isDesktopScreen ? '100%' : 'max-content',
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.25)' : 'none',
        p: '0.25rem 0.75rem',
        borderRadius: '0.5rem',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)'
        }
      }}
      onClick={handleOnClick}
    >
      <Box width="100%" className="flex items-center gap-5">
        {children}
        {isDesktopScreen && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              color: isActive ? '#6aa6fa' : 'black',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  )
}

LeftBarButton.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  handleOnClick: PropTypes.func
}

export default React.memo(LeftBarButton)
