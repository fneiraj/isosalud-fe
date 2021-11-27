import { HttpClient } from 'services/http-client'

export const boxService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/boxes')
}

function getById (id) {
  return HttpClient.get(`/boxes/search?id=${id}`)
}
