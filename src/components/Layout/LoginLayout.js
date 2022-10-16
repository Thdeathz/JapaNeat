import React from 'react'
import PropTypes from 'prop-types'

function LoginLayout({ children }) {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#83EAF1] to-[#63A4FF] flex justify-center items-center">
      <div className="xl:w-3/5 h-3/5 lg:w-4/5 w-full bg-white rounded-md shadow-xl">{children}</div>
    </div>
  )
}

LoginLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default LoginLayout
