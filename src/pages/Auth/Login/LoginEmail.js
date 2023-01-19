import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material'
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '~/hooks/setCookie'
import { useLoginMutation } from '../authApiSlice'
import { setCerdentials } from '../authSlice'
import { toast } from 'react-toastify'

export default function LoginEmail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async data => {
    try {
      const userData = await login({ ...data }).unwrap()
      dispatch(setCerdentials({ ...userData, user: userData.user }))

      setCookie('token', userData.token)
      localStorage.setItem('currentUser', JSON.stringify(userData.user))
      localStorage.setItem('currentAchievements', JSON.stringify(userData.achievements))

      toast.success('Login successfully', {
        toastId: 99
      })
      navigate('/')
    } catch (error) {
      toast.error('Invaild email or password', {
        toastId: 1
      })
    }
  }

  return (
    <FormContainer
      defaultValues={{ email: '', password: '' }}
      onSuccess={data => handleSubmit(data)}
      noValidate
    >
      {console.log('==> re-render')}
      <TextFieldElement
        id="email"
        name="email"
        label="Email"
        required
        variant="standard"
        fullWidth
      />

      <TextFieldElement
        name="password"
        label="Password"
        required
        autoComplete="off"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(show => !show)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        variant="standard"
        fullWidth
        margin="normal"
      />

      <Box className="w-full flex flex-row justify-between items-end">
        <Typography className="underline cursor-pointer hover:text-[#63A4FF]">Sign Up?</Typography>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {!isLoading ? 'Login' : <CircularProgress className="text-width" size={25} />}
        </Button>
      </Box>
    </FormContainer>
  )
}
