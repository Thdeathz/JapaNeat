import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: '50px',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

function FilterArea({ type }) {
  return (
    <Box className="desktop:w-[1200px] w-[904px] flex flex-row justify-between items-center my-4">
      <Box className="flex flex-row items-end gap-4">
        <p className="text-2xl font-bold">{type}</p>
        <p>
          Level <ArrowDropDownIcon />
        </p>
        <p>
          Category <ArrowDropDownIcon />
        </p>
      </Box>
      <Box className="relative bg-secondary mr-2 rounded-2xl">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Box>
    </Box>
  )
}

FilterArea.propTypes = {
  type: PropTypes.string
}

export default FilterArea
