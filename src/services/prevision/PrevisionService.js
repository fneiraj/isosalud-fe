import { HttpClient } from 'services/http-client'

export const previsionService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/prevision')
}

function getById (id) {
  return HttpClient.get(`/prevision/search?id=${id}`)
}
