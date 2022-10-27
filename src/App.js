import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { DefaultLayout } from './components/Layout'
import RequireAuth from './pages/Auth/RequireAuth'
import { privateRoutes, publicRoutes } from './router'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from '@mui/material'

function App() {
  const style = localStorage.getItem('cursor')

  return (
    <Router>
      <Box
        className="App"
        sx={
          style
            ? JSON.parse(style)
            : {
                cursor:
                  'url(https://cdn.custom-cursor.com/db/13717/32/memes-quby-pointer.png), auto',
                'a, button:hover, video:hover': {
                  cursor:
                    'url(https://cdn.custom-cursor.com/db/13718/32/memes-quby-cursor.png), pointer'
                }
              }
        }
      >
        <ToastContainer autoClose={2000} style={{ fontSize: '16px' }} />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            const Layout = route.layout || DefaultLayout
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
          <Route element={<RequireAuth />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout || DefaultLayout
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Route>
        </Routes>
      </Box>
    </Router>
  )
}

export default App
