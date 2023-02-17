// Pages
import {
  Login,
  Home,
  VideoDetail,
  RoomChat,
  RecordDetail,
  Demo,
  Records,
  Videos,
  Ranking,
  DualRoom,
  BattleList
} from '~/pages'

// Layout
import { DefaultLayout, BackArrowLayout, LoginLayout, NoLayout } from '~/components/Layout'

// Public Page
const publicRoutes = [{ path: '/login', component: Login, layout: LoginLayout }]

// Private Page
const privateRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/videos', component: Videos, layout: DefaultLayout },
  { path: '/video/:videoId', component: VideoDetail, layout: BackArrowLayout },
  { path: '/room/:videoId/:roomId', component: RoomChat, layout: NoLayout },
  { path: '/records', component: Records, layout: DefaultLayout },
  { path: '/record/:recordId', component: RecordDetail, layout: DefaultLayout },
  { path: '/ranking', component: Ranking, layout: DefaultLayout },
  { path: '/battles', component: BattleList, layout: DefaultLayout },
  { path: '/dual/:offerId/:answerId/:roomId', component: DualRoom, layout: NoLayout }
]

export { publicRoutes, privateRoutes }
