import { BehaviorSubject } from 'rxjs'
import { authHeader, handleResponse } from 'helpers'
import { HttpClient } from 'services/http-client'
import qs from 'querystring'

const currentUserSubject = new BehaviorSubject(JSON.parse(window.localStorage.getItem('current_user')))
const currentUserTokenSubject = new BehaviorSubject(JSON.parse(window.localStorage.getItem('authentication_tokens')))

export const authenticationService = {
  login,
  logout,
  getMeInfo,
  changePassword,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () {
    return currentUserSubject.value
  },
  currentUserTokens: currentUserTokenSubject.asObservable(),
  get currentUserTokenValue () {
    return currentUserTokenSubject.value
  }
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: {
      username: username,
      password: password
    },
    mode: 'no-cors'
  }

  return HttpClient.post('/auth/login', qs.stringify(requestOptions.body), requestOptions.headers)
    .then(handleResponse)
    .then(async response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      window.localStorage.setItem('authentication_tokens', JSON.stringify(response))
      currentUserTokenSubject.next(response)

      await getMeInfo()

      return response
    })
}

function getMeInfo () {
  return HttpClient.get('/auth/me', authHeader())
    .then(handleResponse)
    .then(response => {
      window.localStorage.setItem('current_user', JSON.stringify(response))
      currentUserSubject.next(response.data)

      return response
    })
}

function changePassword (newPassword) {
  const payload = {
    password: newPassword
  }

  return HttpClient.post('/auth/change-password', payload)
}

function logout () {
  // remove user from local storage to log user out
  window.localStorage.removeItem('authentication_tokens')
  window.localStorage.removeItem('current_user')
  currentUserSubject.next(null)
  currentUserTokenSubject.next(null)
}
