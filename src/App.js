import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { DefaultLayout } from './components/Layout'
import RequireAuth from './pages/Auth/RequireAuth'
import { privateRoutes, publicRoutes } from './router'

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  )
}

export default App
