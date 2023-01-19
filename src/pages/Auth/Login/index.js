import React from 'react'
import LoginEmail from './LoginEmail'
import LoginOptions from './LoginOptions'

export default function Login() {
  return (
    <>
      {console.log('==> re-render')}
      {/* <LoginOptions /> */}
      <LoginEmail />
    </>
  )
}
