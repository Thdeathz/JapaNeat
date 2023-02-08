import React from 'react'
import PropTypes from 'prop-types'

function NoLayout({ children }) {
  return <>{children}</>
}

NoLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default NoLayout
