// Pages
import { Demo, Login, Home } from '~/pages'

// Layout
import { DefaultLayout, LoginLayout } from '~/components/Layout'

// Public Page
const publicRoutes = [{ path: '/login', component: Login, layout: LoginLayout }]

// Private Page
const privateRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/demo', component: Demo, layout: DefaultLayout }
]

export { publicRoutes, privateRoutes }
