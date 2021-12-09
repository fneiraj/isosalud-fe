import { HttpClient } from 'services/http-client'

export const filesService = {
  getAll,
  getById,
  getByIdPatient,
  upload,
  remove
}

function getAll () {
  return HttpClient.get('/files')
}

function getById (id) {
  return HttpClient.get(`/files/search?id=${id}`)
}

function getByIdPatient (id) {
  return HttpClient.get(`/files/search-by-patient?id=${id}`)
}

function upload ({ files, patientId, collectionName }) {
  const formData = new FormData()
  files.forEach(file => formData.append('file', file))

  const headers = {
    'Content-type': 'multipart/form-data'
  }

  return HttpClient.post(`/files/upload?patientId=${patientId}&collectionName=${collectionName}`, formData, headers)
}

function remove (fileId) {
  return HttpClient.post(`/files/delete?id=${fileId}`)
}
