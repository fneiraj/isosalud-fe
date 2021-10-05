import { authHeader, handleResponse } from 'helpers'

const config = {
  apiUrl: 'http://localhost:8080'
}

const add = (note) => {
  const requestOptions = { method: 'POST', headers: authHeader() }
  return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse)
}

function getAll () {
  const requestOptions = { method: 'GET', headers: authHeader() }
  return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse)
}

function getById (id) {
  const requestOptions = { method: 'GET', headers: authHeader() }
  return fetch(`${config.apiUrl}/notes/${id}`, requestOptions).then(handleResponse)
}

export const notesServices = {
  add,
  getAll,
  getById
}
