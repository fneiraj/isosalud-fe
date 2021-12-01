import { HttpClient } from 'services/http-client'

export const rolesService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/roles')
}

function getById (id) {
  return HttpClient.get(`/roles/search?id=${id}`)
}
