import { HttpClient } from 'services/http-client'
import { format } from 'date-fns'

export const userService = {
  getAll,
  getById: getByUsername,
  create,
  edit,
  validate,
  changeStatus,
  getUserStates
}

function getAll () {
  return HttpClient.get('/user')
}

function getUserStates () {
  return HttpClient.get('/user/states')
}

function getByUsername (username) {
  return HttpClient.get(`/user/search?username=${username}`)
}

function create ({ gender, prevision, commune, address: street, rut, firstName, lastName, email, phone, cellphone, dateOfBirth, roleName, preferredContactMeanName, profileImgUri = null, status }) {
  const payload = {
    // id: 37,
    //    username: 'fneiraa',
    password: '12345',
    personInfo: {
      //  _id: 40,
      rut,
      firstName,
      lastName,
      email,
      phone,
      cellphone,
      dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd'),
      gender,
      prevision,
      addressInfo: {
        commune,
        street
      }
      //  _dateCreated: '2028-08-02',
      //  _dateUpdated: 1936429266121
    },
    roleName,
    // _dateCreated: '2022-11-23',
    preferredContactMeanName,
    // _lastLogin: '2030-08-15 ',
    profileImgUri,
    status
  }

  return HttpClient.post('/user', payload)
}

function edit ({ id, gender, prevision, commune, address: street, rut, firstName, lastName, email, phone, cellphone, dateOfBirth, roleName, preferredContactMeanName, profileImgUri = null, status }) {
  const payload = {
    // id: 37,
    //    username: 'fneiraa',
    password: '12345',
    personInfo: {
      //  _id: 40,
      rut,
      firstName,
      lastName,
      email,
      phone,
      cellphone,
      dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd'),
      gender,
      prevision,
      addressInfo: {
        commune,
        street
      }
      //  _dateCreated: '2028-08-02',
      //  _dateUpdated: 1936429266121
    },
    roleName,
    // _dateCreated: '2022-11-23',
    preferredContactMeanName,
    // _lastLogin: '2030-08-15 ',
    profileImgUri,
    status
  }

  return HttpClient.post(`/user/edit?userId=${id}`, payload)
}

function validate ({ rut, firstName, lastName }) {
  const payload = {
    personInfo: {
      rut,
      firstName,
      lastName
    }
  }

  return HttpClient.post('/user/pre-validate', payload)
}

function changeStatus ({ userId, status }) {
  return HttpClient.post(`/user/change-status?userId=${userId}&status=${status}`)
}
