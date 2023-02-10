import { Box, ButtonBase } from '@mui/material'
import React from 'react'

function FilterArea() {
  return (
    <Box className="bg-[white] py-4 px-2 flex gap-2 sticky top-0 z-50">
      <ButtonBase
        sx={{
          p: '0.25rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: true ? '#3da9fc' : 'rgba(0, 0, 0, 0.25)',
          color: 'white',
          '&:hover': { backgroundColor: true ? '#3da9fc' : 'rgba(0, 0, 0, 0.2)' }
        }}
      >
        All
      </ButtonBase>

      <ButtonBase
        sx={{
          p: '0.25rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: false ? '#3da9fc' : 'rgba(0, 0, 0, 0.25)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        }}
      >
        Greeting
      </ButtonBase>

      <ButtonBase
        sx={{
          p: '0.25rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: false ? '#3da9fc' : 'rgba(0, 0, 0, 0.25)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        }}
      >
        Animal
      </ButtonBase>

      <ButtonBase
        sx={{
          p: '0.25rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: false ? '#3da9fc' : 'rgba(0, 0, 0, 0.25)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        }}
      >
        Sport
      </ButtonBase>
    </Box>
  )
}

export default React.memo(FilterArea)
