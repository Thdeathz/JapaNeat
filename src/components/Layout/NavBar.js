import React from 'react'
import { AppBar, Badge, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar className="flex flex-row justify-between">
        <Typography variant="h6" noWrap component="div">
          <Link to="/">JapaNeat</Link>
        </Typography>
        <Box className="flex flex-row justify-center items-center gap-16">
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Home
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Videos
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Records
          </Link>
          <Link className="text-xl font-medium text-default hover:text-textHover" underline="none">
            Ranking
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
