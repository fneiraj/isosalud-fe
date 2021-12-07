import { HttpClient } from 'services/http-client'

export const dentistService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/dentist')
}

function getById (id) {
  return HttpClient.get(`/dentist/search?id=${id}`)
}
