import React from 'react'
import { Avatar, Badge, Box, List, ListItem, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import images from '~/assets/images'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  }
}))

export default function WatchingList() {
  return (
    <>
      <p className="text-center font-semibold text-2xl py-2 text-cardHeadline bg-cardBackground">
        Watching
      </p>
      <List component="div">
        <ListItem button>
          <Stack
            className="w-full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="avatar image" src={images.demoImage} />
            </StyledBadge>
            <h4 className="ml-4 text-xl text-default">Thdeathz</h4>
            <CameraIndoorIcon />
          </Stack>
        </ListItem>
        <ListItem button>
          <Stack
            className="w-full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="avatar image" src={images.demoImage} />
            </StyledBadge>
            <h4 className="ml-4 text-xl text-default">Thdeathz</h4>
            <CameraIndoorIcon />
          </Stack>
        </ListItem>
        <ListItem button>
          <Stack
            className="w-full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="avatar image" src={images.demoImage} />
            </StyledBadge>
            <h4 className="ml-4 text-xl text-default">Thdeathz</h4>
            <CameraIndoorIcon />
          </Stack>
        </ListItem>
      </List>
    </>
  )
}
