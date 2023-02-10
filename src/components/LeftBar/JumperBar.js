import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

function JumperBar({ className, width, height, color, backgroundColor = 'transparent' }) {
  const topBarsRef = useRef([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      topBarsRef.current.forEach((bar, i) => {
        const height = Math.floor(Math.random() * 100)
        const top = 100 - height
        bar.style.height = `${height}%`
        bar.style.top = `${top}%`
      })
    }, 200)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Box
      display="flex"
      gap="0.1rem"
      className={className}
      sx={{ backgroundColor: backgroundColor, width: width, height: height }}
    >
      {Array.from({ length: 15 }, (_, i) => (
        <Box
          key={i}
          ref={el => (topBarsRef.current[i] = el)}
          className={`w-[15%] transition duration-200 relative`}
          sx={{ backgroundColor: color }}
        ></Box>
      ))}
    </Box>
  )
}

JumperBar.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string
}

export default React.memo(JumperBar)
