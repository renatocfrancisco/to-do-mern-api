const fs = require('fs')
const env = require('dotenv').config()

describe('env', () => {
  it('should have a .env file', () => {
    expect(fs.existsSync('.env')).toBe(true)
  })

  it('should contain MONGO_URI and secrets variables', () => {
    expect(env.parsed.MONGO_URI).toBeDefined()
    expect(env.parsed.JWT_SECRET).toBeDefined()
    expect(env.parsed.JWT_REFRESH_SECRET).toBeDefined()
  })

  it('should contain TEST_USER and TEST_PWD', () => {
    expect(env.parsed.TEST_USER_ADMIN).toBeDefined()
    expect(env.parsed.TEST_PWD_ADMIN).toBeDefined()
    expect(env.parsed.TEST_USER).toBeDefined()
    expect(env.parsed.TEST_PWD).toBeDefined()
  })
})
