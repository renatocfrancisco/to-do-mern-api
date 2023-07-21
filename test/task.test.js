const { login, logout, request } = require('./axiosInstance')
const env = require('dotenv').config()
const taskIds = []

describe('task', () => {
  beforeAll(async () => {
    if (!env.parsed.TEST_USER || !env.parsed.TEST_PWD) throw new Error('TEST_USER or TEST_PWD not defined')
    await login(env.parsed.TEST_USER, env.parsed.TEST_PWD)
  })

  afterAll(async () => {
    await logout()
  })

  describe('get 404', () => {
    it('should not return a list of tasks', async () => {
      const response = await request('get', '/tasks')
      expect(response.status).toBe(404)
    })
  })

  describe('post', () => {
    it('should create a task', async () => {
      const data = JSON.stringify({
        task: 'test task',
        priority: 'Medium'
      })
      const response = await request('post', '/tasks', data)
      expect(response.status).toBe(201)
      expect(response.data.task).toHaveProperty('_id')
      expect(response.data.task).toHaveProperty('task', 'test task')
      expect(response.data.task).toHaveProperty('priority', 'Medium')
      expect(response.data.task).toHaveProperty('status', 'Pending')
      taskIds.push(response.data.task._id)
    })

    it('should create a task without priority', async () => {
      const data = JSON.stringify({
        task: 'test task 2'
      })
      const response = await request('post', '/tasks', data)
      expect(response.status).toBe(201)
      expect(response.data.task).toHaveProperty('_id')
      expect(response.data.task).toHaveProperty('task', 'test task 2')
      expect(response.data.task).toHaveProperty('priority', 'Low')
      expect(response.data.task).toHaveProperty('status', 'Pending')
      taskIds.push(response.data.task._id)
    })

    it('should not create a task without title', async () => {
      const data = JSON.stringify({
        priority: 'Medium'
      })
      const response = await request('post', '/tasks', data)
      expect(response.status).toBe(400)
    })

    it('should not create a task with invalid priority', async () => {
      const data = JSON.stringify({
        task: 'test task 3',
        priority: 'invalid'
      })
      const response = await request('post', '/tasks', data)
      expect(response.status).toBe(400)
    })

    it('should not create a task with a task name with more than 100 characters', async () => {
      const data = JSON.stringify({
        task: 'test task 4'.repeat(20)
      })
      const response = await request('post', '/tasks', data)
      expect(response.status).toBe(400)
    })
  })

  describe('get 200', () => {
    it('should return a list of tasks', async () => {
      const response = await request('get', '/tasks')
      expect(response.status).toBe(200)
      expect(response.data).toBeInstanceOf(Array)
    })
  })

  describe('put', () => {
    it('should update a task', async () => {
      if (taskIds[0] === undefined) throw new Error('taskIds is empty')
      const data = JSON.stringify({
        task: 'test task updated',
        priority: 'High',
        status: 'On Hold'
      })
      const response = await request('put', `/tasks/${taskIds[0]}`, data)
      expect(response.status).toBe(200)
      expect(response.data.task).toHaveProperty('_id')
      expect(response.data.task).toHaveProperty('task', 'test task updated')
      expect(response.data.task).toHaveProperty('priority', 'High')
      expect(response.data.task).toHaveProperty('status', 'On Hold')
    })

    it('should update one field of a task', async () => {
      const data = JSON.stringify({
        priority: 'Low'
      })
      const response = await request('put', `/tasks/${taskIds[0]}`, data)
      expect(response.status).toBe(200)
      expect(response.data.task).toHaveProperty('_id')
      expect(response.data.task).toHaveProperty('task', 'test task updated')
      expect(response.data.task).toHaveProperty('priority', 'Low')
      expect(response.data.task).toHaveProperty('status', 'On Hold')
    })
  })

  describe('delete', () => {
    it('should delete a task', async () => {
      if (taskIds === []) throw new Error('taskIds is empty')
      for (let i = 0; i < taskIds.length; i++) {
        const response = await request('delete', `/tasks/${taskIds[i]}`)
        expect(response.status).toBe(200)
      }
    })

    it('should not delete a task with invalid id', async () => {
      const response = await request('delete', '/tasks/invalid')
      expect(response.status).toBe(400)
    })
  })
})
