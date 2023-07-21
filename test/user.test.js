const { login, logout, request } = require('./axiosInstance')
let userId = null

describe('user', () => {
  beforeAll(async () => {
    await login()
  })

  afterAll(async () => {
    await logout()
  })

  describe('get', () => {
    it('should return a list of users', async () => {
      const response = await request('get', '/users')
      expect(response.status).toBe(200)
      expect(response.data).toBeInstanceOf(Array)
    })
  })

  describe('post', () => {
    it('should create a user', async () => {
      const data = JSON.stringify({
        username: 'test user to delete',
        password: 'test pwd'
      })
      const response = await request('post', '/users', data)
      expect(response.status).toBe(201)
      expect(response.data.user).toHaveProperty('_id')
      expect(response.data.user).toHaveProperty('username', 'test user to delete')
      userId = response.data.user._id
    })

    it('should not create a user without username or password', async () => {
      const data = JSON.stringify({
        password: 'test pwd'
      })
      const response = await request('post', '/users', data)
      expect(response.status).toBe(400)

      const data2 = JSON.stringify({
        username: 'test user'
      })
      const response2 = await request('post', '/users', data2)
      expect(response2.status).toBe(400)
    })

    it('should not create a user with an existing username', async () => {
      const data = JSON.stringify({
        username: 'renato',
        password: 'pwd'
      })
      const response = await request('post', '/users', data)
      expect(response.status).toBe(400)
    })

    it('should not create a user with a username with less than 3 characters, neither more than 20 characters', async () => {
      const data = JSON.stringify({
        username: 'te',
        password: 'pwd'
      })
      const response = await request('post', '/users', data)
      expect(response.status).toBe(400)
      const data2 = JSON.stringify({
        username: 'test user with more than 20 characters',
        password: 'pwd'
      })
      const response2 = await request('post', '/users', data2)
      expect(response2.status).toBe(400)
    })
  })

  describe('get by id', () => {
    it('should return a user', async () => {
      if (!userId) throw new Error('userId not defined')
      const response = await request('get', `/users/${userId}`)
      expect(response.status).toBe(200)
      expect(response.data).toHaveProperty('_id', userId)
    })

    it('should return a 400 status with invalid id', async () => {
      const response = await request('get', '/users/invalid')
      expect(response.status).toBe(400)
    })
  })

  describe('put', () => {
    it('should update a user', async () => {
      const data = JSON.stringify({
        username: 'test user updated',
        password: 'test pwd'
      })
      const response = await request('put', `/users/${userId}`, data)
      expect(response.status).toBe(200)
      expect(response.data.user).toHaveProperty('username', 'test user updated')
    })

    it('should update one field of a user', async () => {
      const data = JSON.stringify({
        username: 'test user to delete updated again'
      })
      const response = await request('put', `/users/${userId}`, data)
      expect(response.status).toBe(200)
      expect(response.data.user).toHaveProperty('username', 'test user to delete updated again')
    })
  })

  describe('delete by id', () => {
    it('should delete a user', async () => {
      const response = await request('delete', `/users/${userId}`)
      expect(response.status).toBe(200)
    })

    it('should return a 400 status with invalid id', async () => {
      const response = await request('delete', '/users/invalid')
      expect(response.status).toBe(400)
    })
  })
})
