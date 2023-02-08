import React from 'react'
import { AccountCircle, GitHub, LogoutOutlined } from '@mui/icons-material'
import { Box, ButtonBase, Typography } from '@mui/material'
import ButtonPopover from '~/components/ButtonPopover'
import FlexBetween from '~/components/FlexBetween'
import { setLogout, useLogoutMutation } from '~/pages/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import removeCookie from '~/hooks/removeCookie'
import { toast } from 'react-toastify'

const UserMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setLogout())
      removeCookie('token')
      navigate('/login')
      toast.success('Logout successfully', {
        toastId: 'logout'
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ButtonPopover button={<AccountCircle />}>
      <Box display="flex" flexDirection="column" gap="0.25rem" sx={{ padding: '0.25rem' }}>
        <ButtonBase
          sx={{
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
          }}
          onClick={() => window.open(`https://github.com/Thdeathz/JapaNeat`)}
        >
          <FlexBetween gap="0.5rem">
            <GitHub />
            <Typography fontWeight={'500'}>Github</Typography>
          </FlexBetween>
        </ButtonBase>

        <ButtonBase
          sx={{
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
          }}
          onClick={handleLogout}
        >
          <FlexBetween gap="0.5rem">
            <LogoutOutlined />
            <Typography fontWeight={'500'}>Logout</Typography>
          </FlexBetween>
        </ButtonBase>
      </Box>
    </ButtonPopover>
  )
}

export default React.memo(UserMenu)
