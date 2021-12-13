import { HttpClient } from 'services/http-client'

export const adminService = {
  getResume
}

function getResume () {
  return HttpClient.get('/admin/resume')
}
