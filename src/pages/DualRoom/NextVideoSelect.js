import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase, Typography } from '@mui/material'
import { updateDocument } from '~/firebase/services'
import { FlexBetween } from '~/components'

function NextVideoSelect({ videos, roomId, roomData, className }) {
  const handleChangeCurrentVideo = async (videoUrl, videoId) => {
    await updateDocument({
      collectionName: `dual`,
      id: roomId,
      data: {
        videoId,
        videoUrl,
        battleStatus: 'idle'
      }
    })
  }

  return (
    <FlexBetween flexDirection="column" className={className}>
      <Box id="video-list" className="w-full flex flex-col gap-1 overflow-y-scroll">
        {videos.ids.map((id, index) => (
          <ButtonBase
            key={`next-video-list-${index}`}
            sx={{
              width: '100%',
              borderRadius: '0.5rem',
              backgroundColor: roomData?.videoId === id ? 'rgba(0, 0, 0, 0.25)' : 'none',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.15)' }
            }}
            onClick={() => handleChangeCurrentVideo(videos.entities[id].video.url, id)}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              className="w-full p-2"
            >
              <img
                className="w-[30%] rounded"
                src={videos.entities[id].video.thumbnail ?? images.noImage}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    textOverflow: 'break-word',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}
                >
                  {videos.entities[id].title}
                </Typography>

                <Typography
                  variant="h8"
                  sx={{
                    textAlign: 'left'
                  }}
                >
                  {videos.entities[id].category}
                </Typography>
              </Box>
            </Box>
          </ButtonBase>
        ))}
      </Box>
    </FlexBetween>
  )
}

NextVideoSelect.propTypes = {
  videos: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  roomData: PropTypes.any,
  className: PropTypes.string
}

export default React.memo(NextVideoSelect)
