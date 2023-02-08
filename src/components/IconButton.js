import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, Typography } from '@mui/material'
import { useHover } from 'usehooks-ts'
import FlexBetween from './FlexBetween'

function IconButton({ children, textDetail, style, handleOnClick, isActive = false }) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  return (
    <ButtonBase
      sx={{
        p: '0.5rem',
        borderRadius: '0.25rem',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.15)'
        }
      }}
      ref={hoverRef}
      onClick={handleOnClick}
    >
      <FlexBetween gap="0.2rem">
        {children}
        {isHover && (
          <Typography sx={{ fontWeight: '500', color: isActive && '#6aa6fa', ...style }}>
            {textDetail}
          </Typography>
        )}
      </FlexBetween>
    </ButtonBase>
  )
}

IconButton.propTypes = {
  textDetail: PropTypes.string,
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
  handleOnClick: PropTypes.func,
  isActive: PropTypes.bool
}

export default React.memo(IconButton)
