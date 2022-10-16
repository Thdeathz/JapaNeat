import React from 'react'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'

export default function LoginOptions() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-8">
      <Button fullWidth={true} variant="outlined">
        Email
      </Button>
      <Button startIcon={<GoogleIcon />} fullWidth={true} variant="outlined">
        Google
      </Button>
      <Button startIcon={<FacebookIcon />} fullWidth={true} variant="outlined">
        Facebook
      </Button>
    </div>
  )
}
