import { HttpClient } from 'services/http-client'

export const evolutionService = {
  getAll,
  getById,
  getByIdPatient,
  create,
  remove
}

function getAll () {
  return HttpClient.get('/evolutions')
}

function getById (id) {
  return HttpClient.get(`/evolutions/search?id=${id}`)
}

function getByIdPatient (id) {
  return HttpClient.get(`/evolutions/search-patient?id=${id}`)
}

function create ({ patientId, comment }) {
  const payload = {
    comment,
    patient: {
      id: patientId
    }
  }

  return HttpClient.post('/evolutions', payload)
}

function remove (noteId) {
  return HttpClient.post(`/evolutions/delete?id=${noteId}`)
}
