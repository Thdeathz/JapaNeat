// Pages
import { Login, Home, VideoDetail, RoomChat, RecordDetail, Demo } from '~/pages'

// Layout
import { DefaultLayout, BackArrowLayout, LoginLayout, NoLayout } from '~/components/Layout'

// Public Page
const publicRoutes = [{ path: '/login', component: Login, layout: LoginLayout }]

// Private Page
const privateRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/video/:videoId', component: VideoDetail, layout: BackArrowLayout },
  { path: '/room/:videoId/:roomId', component: RoomChat, layout: NoLayout },
  { path: '/record/:recordId', component: RecordDetail, layout: DefaultLayout }
]

export { publicRoutes, privateRoutes }
