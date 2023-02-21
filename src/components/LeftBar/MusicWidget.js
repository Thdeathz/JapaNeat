import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Circle, PauseCircleOutlineOutlined, PlayCircleOutlineOutlined } from '@mui/icons-material'
import { Box, ButtonBase, Typography } from '@mui/material'
import FlexBetween from '../FlexBetween'
import { useHover } from 'usehooks-ts'
import JumperBar from './JumperBar'

function MusicWidget({ musicData }) {
  const playMusicRef = useRef(null)
  const musicRef = useRef(null)
  const isHover = useHover(playMusicRef)

  const [isPlayMusic, setIsPlayMusic] = useState(false)

  const handlePlayPause = () => {
    if (isPlayMusic) {
      musicRef.current.pause()
      setIsPlayMusic(false)
      return
    }
    musicRef.current.play()
    setIsPlayMusic(true)
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: '0.5rem 1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Box className="flex items-center gap-2">
        <ButtonBase
          className="w-[40px] relative"
          sx={{
            borderRadius: '50%'
          }}
          ref={playMusicRef}
          onClick={handlePlayPause}
        >
          <img
            className={
              isPlayMusic
                ? 'w-[40px] h-[40px] object-cover rounded-[50%] animate-spin-slow'
                : 'w-[40px] h-[40px] object-cover rounded-[50%]'
            }
            src={musicData.image}
          />
          {isHover ? (
            <FlexBetween
              className="absolute top-0 left-0 w-full h-full"
              sx={{ borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
            >
              {isPlayMusic ? (
                <PauseCircleOutlineOutlined
                  sx={{ color: 'white', flexGrow: 1, fontSize: '2rem', zIndex: 1 }}
                />
              ) : (
                <PlayCircleOutlineOutlined
                  sx={{ color: 'white', flexGrow: 1, fontSize: '1.5rem' }}
                />
              )}
            </FlexBetween>
          ) : (
            <FlexBetween className="w-full h-full absolute top-0 left-0 rounded-[50%]">
              <Circle sx={{ color: 'white', flexGrow: 1, fontSize: '0.7rem' }} />
            </FlexBetween>
          )}
        </ButtonBase>

        {isPlayMusic ? (
          <JumperBar
            className="basis-3/4 transition ease-in-out duration-300"
            width="100%"
            height="1.5rem"
            color="#6aa6fa"
          />
        ) : (
          <Typography
            variant="h8"
            className="basis-3/4 transition ease-in-out duration-300"
            sx={{
              fontWeight: '500',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {musicData.name}
          </Typography>
        )}

        <audio ref={musicRef} src={Boolean(musicData.url) ? musicData.url : null} />
      </Box>
    </Box>
  )
}

MusicWidget.propTypes = {
  musicData: PropTypes.object.isRequired
}

export default React.memo(MusicWidget)
