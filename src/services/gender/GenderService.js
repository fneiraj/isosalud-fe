import { HttpClient } from 'services/http-client'

export const genderService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/gender')
}

function getById (id) {
  return HttpClient.get(`/gender/search?id=${id}`)
}
