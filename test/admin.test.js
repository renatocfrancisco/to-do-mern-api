const { login, logout, request } = require('./axiosInstance')
const env = require('dotenv').config()

describe('admin', () => {
  beforeAll(async () => {
    if (!env.parsed.TEST_USER || !env.parsed.TEST_PWD) throw new Error('TEST_USER or TEST_PWD not defined')
    await login(env.parsed.TEST_USER, env.parsed.TEST_PWD)
  })

  afterAll(async () => {
    await logout()
  })

  it('should return a 403 status when trying to access an admin route as a normal user', async () => {
    const response = await request('delete', '/user/id')
    expect(response.status).toBe(403)
  })
})
