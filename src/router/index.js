// Pages
import { DemoPage } from '~/pages'

// Layout
import { DefaultLayout } from '~/components/Layout'

// Public Page
const publicRoutes = [{ path: '/demo', component: DemoPage, layout: DefaultLayout }]

// Private Page
const privateRoutes = []

export { publicRoutes, privateRoutes }
