const { request } = require('./axiosInstance')
const env = require('dotenv').config()
var token = null
var refresh = null

describe('auth', () => {
  describe('login', () => {
    it('should return an access and refresh token', async () => {
      const data = JSON.stringify({
        username: env.parsed.TEST_USER_ADMIN,
        password: env.parsed.TEST_PWD_ADMIN
      })
      const response = await request('post', '/login', data)
      expect(response.data).toHaveProperty('accessToken')
      expect(response.data).toHaveProperty('refreshToken')
      token = response.data.accessToken
      refresh = response.data.refreshToken
    })
  })

  describe('refresh', () => {
    it('should return a new access token', async () => {
      if(!token) throw new Error('No token defined in login')
      const response = await request('get', '/refresh', null, token, refresh)
      expect(response.data).toHaveProperty('accessToken')
    })
  })

  describe('logout', () => {
    it('should return a 204 status', async () => {
      const response = await request('get', '/logout', null, token, refresh)
      expect(response.status).toBe(204)
    })
  })
})
