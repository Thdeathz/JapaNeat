import React from 'react'
import PropTypes from 'prop-types'

function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col">
      <div>Header</div>
      {children}
      <div>Footer</div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default DefaultLayout
