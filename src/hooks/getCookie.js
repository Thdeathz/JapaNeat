import Cookie from 'js-cookie'

export const getCookie = cookieName => {
  const cookie = Cookie.get(cookieName)
  return cookie ? JSON.parse(cookie) : null
}
