import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Box, ButtonBase, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { FlexBetween, Loading } from '~/components'

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

function WatchingList({ watchingList, handleSendOffer, handleStartBattle }) {
  const currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="0.25rem"
        className="w-full h-full p-2"
        sx={{
          overflow: 'auto'
        }}
      >
        {watchingList ? (
          watchingList.map(
            user =>
              Number(user.id) !== currentUserData.id && (
                <Box
                  key={user.id}
                  sx={{
                    p: '0.4rem 0.6rem',
                    borderRadius: '0.25rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <FlexBetween className="w-full">
                    <FlexBetween gap="0.5rem">
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <AccountCircle />
                      </StyledBadge>
                      <Typography
                        variant="h6"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {user?.userName}
                      </Typography>
                    </FlexBetween>

                    <FlexBetween className="h-full">
                      <ButtonBase
                        className="h-full"
                        sx={{
                          p: '0.5rem 0.5rem 0.5rem 1rem',
                          borderTopLeftRadius: '0.5rem',
                          borderBottomLeftRadius: '0.5rem',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
                        }}
                        onClick={() => handleSendOffer(user)}
                      >
                        <Typography
                          variant="h8"
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}
                        >
                          K🗣️iwa
                        </Typography>
                      </ButtonBase>

                      <ButtonBase
                        className="h-full"
                        sx={{
                          p: '0.5rem 1rem 0.5rem 0.5rem',
                          borderTopRightRadius: '0.5rem',
                          borderBottomRightRadius: '0.5rem',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
                        }}
                        onClick={() => handleStartBattle(user)}
                      >
                        <Typography
                          variant="h8"
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}
                        >
                          B⚔️ttle
                        </Typography>
                      </ButtonBase>
                    </FlexBetween>
                  </FlexBetween>
                </Box>
              )
          )
        ) : (
          <Loading />
        )}
      </Box>
    </>
  )
}

WatchingList.propTypes = {
  watchingList: PropTypes.array,
  handleSendOffer: PropTypes.func.isRequired,
  handleStartBattle: PropTypes.func.isRequired
}

export default React.memo(WatchingList)
