import { HttpClient } from 'services/http-client'

export const appointmentService = {
  getAll,
  getAllOwn,
  getAllByPatientRut,
  getById,
  add,
  edit,
  cancel,
  getUnavaibleBoxes
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

function getUnavaibleBoxes (startDate, endDate) {
  const payload = {
    startDate,
    endDate
  }

  return HttpClient.get('/appointment/unavailable', payload)
}

function cancel (id) {
  return HttpClient.post('/appointment/cancel', { id })
}

function add ({ box, comment, endDate, startDate, patient, title, type, medic, treatmentId }) {
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
      id: patient?.id
    },
    medic: {
      id: medic?.id !== undefined ? medic.id : medic
    },
    treatment: {
      id: treatmentId === -1 ? undefined : treatmentId
    }
  }

  return HttpClient.post('/appointment', payload)
}

function edit ({ id, box, comment, endDate, startDate, patient, title, type, medic, treatmentId }) {
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
      id: patient?.id !== undefined ? patient?.id : patient?.id
    },
    medic: {
      id: medic?.id !== undefined ? medic?.id : medic?.id
    },
    treatment: {
      id: treatmentId === -1 ? undefined : treatmentId
    }
  }

  return HttpClient.post(`/appointment/edit?appointmentId=${id}`, payload)
}
