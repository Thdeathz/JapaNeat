import React from 'react'
import { useGetCurrentUserQuery } from '../Auth/authApiSlice'

export default function Home() {
  const { data: currentUser, isSuccess } = useGetCurrentUserQuery()

  return (
    <div>
      {console.log('Current user: ', currentUser)}
      Home
    </div>
  )
}
