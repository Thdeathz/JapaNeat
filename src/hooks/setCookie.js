import Cookie from 'js-cookie'

export const setCookie = (cookieName, value) => {
  Cookie.set(cookieName, JSON.stringify(value), {
    expires: 1, // 1 day
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}
