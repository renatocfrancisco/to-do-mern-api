const axios = require('axios')
const env = require('dotenv').config()

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

async function login (user = env.parsed.TEST_USER_ADMIN, pwd = env.parsed.TEST_PWD_ADMIN) {
  const data = JSON.stringify({
    username: user,
    password: pwd
  })

  const config = {
    method: 'post',
    url: '/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  const response = await axiosInstance(config).then((response) => {
    return response.data
  }
  ).catch((error) => {
    if(error.response){
      throw new Error(error.response.data.message)
    }
    throw new Error('Login failed: ', error)
  })

  axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`
  axiosInstance.defaults.headers.cookies = `jwt=${response.refreshToken}`
}

async function logout () {
  const config = {
    method: 'get',
    url: '/logout',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await axiosInstance(config).then((_response) => {
    console.log('logout ok')
    axiosInstance.defaults.headers.common.Authorization = ''
  }
  ).catch((error) => {
    console.error(error)
  })
}

async function request (method, url, data = null, token = null, refresh = null) {
  const methods = ['get', 'post', 'put', 'delete']
  if (methods.indexOf(method) === -1) throw new Error('Invalid method')
  if(token){
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  if(refresh){
    axiosInstance.defaults.headers.cookies = `jwt=${refresh}`
  }
  const config = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if(data){
    config.data = data
  }

  const response = await axiosInstance(config).then((response) => {
    if(url === '/refresh'){
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
    }
    if(url === '/logout'){
      axiosInstance.defaults.headers.common.Authorization = ''
    }
    return response
  }
  ).catch((error) => {
    return error.response
  })

  return response
}

module.exports = { request, login, logout }
