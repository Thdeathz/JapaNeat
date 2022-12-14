// Pages
import { Demo, Login, Home, VideoDetail, RoomChat, RecordDetail } from '~/pages'

// Layout
import { DefaultLayout, LoginLayout } from '~/components/Layout'

// Public Page
const publicRoutes = [{ path: '/login', component: Login, layout: LoginLayout }]

// Private Page
const privateRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/video/:videoId', component: VideoDetail, layout: DefaultLayout },
  { path: '/room/:videoId/:roomId', component: RoomChat, layout: DefaultLayout },
  { path: '/record/:recordId', component: RecordDetail, layout: DefaultLayout },
  { path: '/demo', component: Demo, layout: DefaultLayout }
]

export { publicRoutes, privateRoutes }
