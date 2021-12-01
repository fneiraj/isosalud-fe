import { HttpClient } from 'services/http-client'

export const feriadosService = {
  getAll
}

function getAll () {
  return HttpClient.get('https://apis.digital.gob.cl/fl/feriados/2021')
}
