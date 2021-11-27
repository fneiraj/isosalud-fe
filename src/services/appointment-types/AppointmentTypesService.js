import { HttpClient } from 'services/http-client'

export const appointmentTypesService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/appointment/types')
}

function getById (id) {
  return HttpClient.get(`/appointment/types/search?id=${id}`)
}
