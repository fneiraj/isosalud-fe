import { HttpClient } from 'services/http-client'

export const appointmentService = {
  getAllOwn,
  getAllByPatientRut,
  getById,
  add,
  cancel
}

function getAllOwn () {
  return HttpClient.get('/appointment/own')
}

function getAllByPatientRut (rut) {
  return HttpClient.get(`/appointment/search?rut-patient=${rut}`)
}

function getById (id) {
  return HttpClient.get(`/appointment/search?id=${id}`)
}

function cancel (id) {
  return HttpClient.post('/appointment/cancel', { id })
}

function add ({ box, comment, endDate, startDate, patient, title, type }) {
  const payload = {
    title,
    startDate,
    endDate,
    box: {
      id: box
    },
    type: {
      id: type
    },
    comment,
    patient: {
      id: patient?.personInfo?.id
    },
    _treatmentId: 1
  }

  return HttpClient.post('/appointment', payload)
}
