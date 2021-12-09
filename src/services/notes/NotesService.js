import { HttpClient } from 'services/http-client'

export const notesService = {
  getAll,
  getById,
  getByIdPatient,
  getNoteTypes,
  create,
  update,
  remove
}

function getAll () {
  return HttpClient.get('/notes')
}

function getById (id) {
  return HttpClient.get(`/notes/search?id=${id}`)
}

function getByIdPatient (id) {
  return HttpClient.get(`/notes/search-patient?id=${id}`)
}

function getNoteTypes () {
  return HttpClient.get('/notes/types')
}

function create ({ comment, userTargetId, noteType }) {
  const payload = {
    comment,
    destinatario: {
      id: userTargetId !== undefined ? userTargetId : undefined
    },
    noteType
  }

  return HttpClient.post('/notes', payload)
}

function update (note) {
  const payload = {
    ...note
  }

  return HttpClient.post(`/notes/update?id=${note.id}`, payload)
}

function remove (noteId) {
  return HttpClient.post(`/notes/delete?id=${noteId}`)
}
