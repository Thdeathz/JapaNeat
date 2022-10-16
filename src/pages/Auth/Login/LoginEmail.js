import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '~/hooks/setCookie'
import { useLoginMutation } from '../authApiSlice'
import { setCerdentials } from '../authSlice'

export default function LoginEmail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: null,
    password: null
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const userData = await login({ ...formData }).unwrap()
      dispatch(setCerdentials({ ...userData, user: userData.user }))
      setCookie('token', userData.token)
      navigate('/demo')
    } catch (error) {
      console.log('Toang meo chay r loi cc: ', error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8">
      <TextField
        fullWidth
        required
        autoFocus
        size="medium"
        id="Email"
        label="Email"
        variant="standard"
        onChange={event =>
          setFormData({
            ...formData,
            email: event.target.value
          })
        }
      />
      <TextField
        fullWidth
        required
        size="medium"
        id="Password"
        label="Password"
        variant="standard"
        onChange={event =>
          setFormData({
            ...formData,
            password: event.target.value
          })
        }
      />
      <div className="w-full">
        <Button variant="contained" onClick={e => handleSubmit(e)} disabled={isLoading}>
          Login
        </Button>
      </div>
    </div>
  )
}
