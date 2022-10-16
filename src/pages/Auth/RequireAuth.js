import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getCookie } from '~/hooks/getCookie'

const RequireAuth = () => {
  const token = getCookie('token')
  const location = useLocation()

  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
export default RequireAuth
