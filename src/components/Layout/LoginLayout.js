import React from 'react'
import PropTypes from 'prop-types'
import images from '~/assets/images'

function LoginLayout({ children }) {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#83EAF1] to-[#63A4FF] flex justify-center items-center">
      <div
        className="2xl:w-[888px] lg:w-[60vw] w-[90vw] 2xl:h-[470px] lg:h-[65vh] h-[360px]
        bg-white rounded-md shadow-xl flex flex-row justify-center items-center"
      >
        <div className="lg:basis-3/6 md:basis-2/5 md:flex hidden justify-center text-center">
          <img className="lg:w-[50%] w-[65%]" src={images.loginThumbnail} />
        </div>
        <div
          className="lg:basis-3/6 md:basis-3/5 w-full h-full sm:p-8 py-8 px-4 
          flex flex-col gap-4 md:justify-center justify-between aligns-center relative"
        >
          <img
            className="sm:w-[35%] w-[50%] md:absolute md:top-4"
            src={images.appLogo}
            alt="App Logo"
          />
          {children}
        </div>
      </div>
    </div>
  )
}

LoginLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default LoginLayout
