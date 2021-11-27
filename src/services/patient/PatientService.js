import { HttpClient } from 'services/http-client'

export const patientService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/patient')
}

function getById (id) {
  return HttpClient.get(`/patient/search?id=${id}`)
}
