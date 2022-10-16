import React from 'react'
import images from '~/assets/images'
import LoginEmail from './LoginEmail'
import LoginOptions from './LoginOptions'

export default function Login() {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="sm:basis-3/5 flex justify-center text-center">
        <h1 className="text-center">Thumbnail</h1>
      </div>
      <div className="sm:basis-2/5 h-full p-8 flex flex-col justify-center relative">
        <img className="w-2/5 absolute top-4" src={images.logo} alt="App Logo" />
        {/* <LoginOptions /> */}
        <LoginEmail />
      </div>
    </div>
  )
}
