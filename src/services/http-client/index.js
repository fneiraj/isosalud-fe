import { authenticationService } from 'services/auth/AuthenticationService'
import { authHeader, history } from 'helpers'

const axios = require('axios')

const host = 'http://localhost:8080'

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${host}${url}`

// Axios response interceptor
axios.interceptors.response.use(function (config) {
  return config
}, function (error) {
  const { response } = error

  if (response.status !== 200 && response.data?.code === 'AUTH002') {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout()
      history.replace('/')
    }

    const error = (response.data && response.data.message) || response.statusText
    return Promise.reject(error)
  }

  return Promise.reject(error)
})

// Axios request interceptor
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = authHeader().Authorization
  return config
}, function (error) {
  return Promise.reject(error)
})

const get = (url = '', headers = {}) => {
  return axios.get(readUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

const post = (url = '', body = {}, headers = {}) => {
  return axios.post(readUrl(url), body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

const put = (url = '', body = {}, headers = {}) => {
  return axios.put(readUrl(url), body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

const del = (url = '', headers = {}) => {
  return axios.delete(readUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

export const HttpClient = {
  get,
  post,
  put,
  delete: del
}
