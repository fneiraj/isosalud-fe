import { HttpClient } from 'services/http-client'

export const userService = {
  getAll,
  getById: getByUsername,
  create
}

function getAll () {
  return HttpClient.get('/user')
}

function getByUsername (username) {
  return HttpClient.get(`/user/search?username=${username}`)
}

function create ({ rut, firstName, lastName, email, phone, cellphone, dateOfBirth, roleName, preferredContactMeanName, profileImgUri = null }) {
  const payload = {
    // id: 37,
    //    username: 'fneiraa',
    password: '12345',
    personDto: {
    //  _id: 40,
      rut,
      firstName,
      lastName,
      email,
      phone,
      cellphone,
      dateOfBirth
    //  _dateCreated: '2028-08-02',
    //  _dateUpdated: 1936429266121
    },
    roleName,
    // _dateCreated: '2022-11-23',
    preferredContactMeanName,
    // _lastLogin: '2030-08-15 ',
    profileImgUri
  }

  return HttpClient.post('/user', payload)
}
