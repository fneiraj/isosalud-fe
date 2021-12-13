import { HttpClient } from 'services/http-client'

export const treatmentService = {
  getAll,
  getAllByPatientId,
  getById,
  add,
  edit,
  changeState,
  getAllClinicalProcesses,
  getAllSpecializations
}

const basePath = '/treatments'

function getAll () {
  return HttpClient.get(basePath)
}

function getById (id) {
  return HttpClient.get(basePath + `/search?id=${id}`)
}

function getAllByPatientId (patientId) {
  return HttpClient.get(basePath + `/search-by-patient?id=${patientId}`)
}

function getAllClinicalProcesses () {
  return HttpClient.get(basePath + '/clinic-process')
}

function getAllSpecializations () {
  return HttpClient.get(basePath + '/specializations')
}

function changeState ({ treatmentId, state }) {
  return HttpClient.post(basePath + `/change-state?id=${treatmentId}&state=${state}`)
}

function add ({ medicId, patientId, comment, specializationId, state, processes, odontogramaType }) {
  const payload = {
    medic: {
      id: medicId
    },
    patient: {
      id: patientId
    },
    comment: comment,
    specialization: {
      id: specializationId
    },
    state: state,
    processes: processes.map(p => ({
      id: p.id,
      price: p.price,
      pieces: p.pieces
    })),
    typeOdontograma: odontogramaType
  }

  return HttpClient.post(basePath, payload)
}

function edit () {
  return HttpClient.post(basePath + '/edit')
}
