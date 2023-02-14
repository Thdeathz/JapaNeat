import React from 'react'
import PropTypes from 'prop-types'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import images from '~/assets/images'

function RelativeRecordCard({ record }) {
  const navigate = useNavigate()

  return (
    <ButtonBase
      sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.25)' } }}
      onClick={() => navigate(`/record/${record.id}`)}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        className="w-full p-2"
      >
        <img className="w-[30%] rounded" src={record.record.thumbnail ?? images.noImage} />
        <Typography
          variant="h6"
          sx={{ textOverflow: 'break-word', fontWeight: '500', textAlign: 'left' }}
        >{`${record.offer.name} and ${record.answer.name} kaiwa`}</Typography>
      </Box>
    </ButtonBase>
  )
}

RelativeRecordCard.propTypes = {
  record: PropTypes.object.isRequired
}

export default React.memo(RelativeRecordCard)
