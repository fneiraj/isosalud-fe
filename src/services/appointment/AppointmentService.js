import { HttpClient } from 'services/http-client'

export const appointmentService = {
  getAll,
  getAllOwn,
  getAllByPatientRut,
  getById,
  add,
  edit,
  cancel
}

function getAll () {
  return HttpClient.get('/appointment')
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

function add ({ box, comment, endDate, startDate, patient, title, type, medic }) {
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
    medic: {
      id: medic
    },
    _treatmentId: 1
  }

  return HttpClient.post('/appointment', payload)
}

function edit ({ id, box, comment, endDate, startDate, patient, title, type, medic }) {
  console.log({ patient })
  console.log({ medic })

  const payload = {
    title,
    startDate,
    endDate,
    box: {
      id: box.id !== undefined ? box.id : box
    },
    type: {
      id: type.id !== undefined ? type.id : type
    },
    comment,
    patient: {
      id: patient?.personInfo?.id !== undefined ? patient?.personInfo?.id : patient?.id
    },
    medic: {
      id: medic?.personInfo?.id !== undefined ? medic?.personInfo?.id : medic?.id
    },
    _treatmentId: 1
  }

  return HttpClient.post(`/appointment/edit?appointmentId=${id}`, payload)
}
