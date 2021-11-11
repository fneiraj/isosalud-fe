import { HttpClient } from 'services/http-client'

export const userService = {
  getAll,
  getById: getByUsername
}

function getAll () {
  return HttpClient.get('/user')
}

function getByUsername (username) {
  return HttpClient.get(`/user/search?username=${username}`)
}
