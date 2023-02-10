import React, { useRef, useState } from 'react'
import { Box, ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material'

// eslint-disable-next-line react/prop-types
const ButtonPopover = ({ button, children, style }) => {
  const [isOpenMenu, setIsOpenMennu] = useState(false)
  const menuAnchorRef = useRef(null)

  const handleClose = e => {
    if (menuAnchorRef.current && menuAnchorRef.current.contains(e.target)) {
      return
    }

    setIsOpenMennu(false)
  }

  return (
    <>
      <IconButton
        ref={menuAnchorRef}
        aria-controls={isOpenMenu ? 'menu-popover' : undefined}
        aria-expanded={isOpenMenu ? 'true' : undefined}
        aria-haspopup="true"
        sx={style}
        onClick={() => setIsOpenMennu(!isOpenMenu)}
      >
        {button}
      </IconButton>
      <Popper
        open={isOpenMenu}
        anchorEl={menuAnchorRef.current}
        placement="top-end"
        transition
        disablePortal
        sx={{
          zIndex: 999
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'bottom right'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>{children}</Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default React.memo(ButtonPopover)
