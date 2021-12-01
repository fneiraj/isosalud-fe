import { HttpClient } from 'services/http-client'

export const contactMeansService = {
  getAll,
  getById
}

function getAll () {
  return HttpClient.get('/contact-means')
}

function getById (id) {
  return HttpClient.get(`/contact-means/search?id=${id}`)
}
