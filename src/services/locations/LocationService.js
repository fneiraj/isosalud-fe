import { HttpClient } from 'services/http-client'

export const locationService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/location')
}

function getById (id) {
  return HttpClient.get(`/location/search?id=${id}`)
}
