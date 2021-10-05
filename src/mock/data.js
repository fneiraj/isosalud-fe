import Faker from 'faker'
import { Role } from 'models/Role'

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Homero',
    lastName: 'Simpson',
    avatar: 'https://rebot.me/assets/images/mini-avatars/239762.jpg?r=1460551539',
    role: Role.Admin
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    firstName: 'Bart',
    lastName: 'Simpson',
    avatar: 'https://i1.sndcdn.com/avatars-sqky2IbwKcB8cLrx-uftfPw-t500x500.jpg',
    role: Role.User
  },
  {
    id: 3,
    username: 'jhon.doe',
    password: 'jhon.doe',
    firstName: 'Jhon',
    lastName: 'Doe',
    avatar: 'https://pbs.twimg.com/profile_images/1232389679263211520/yfYHDiNS.jpg',
    role: Role.User
  }
]

const patients = (
  Array.from({ length: 105 }, (item, index) => ({
    id: Faker.datatype.uuid(),
    name: Faker.name.findName(),
    treatments: Faker.datatype.number(),
    phone: Faker.datatype.number(),
    nextMeeting: Faker.date.future().toLocaleDateString()
  })
  ).concat(
    {
      id: '1000',
      rut: '20352825-6',
      name: 'Fernando Neira',
      treatments: Faker.datatype.number(),
      phone: 56912345678,
      nextMeeting: Faker.date.future().toLocaleDateString()
    },
    {
      id: '1001',
      rut: '11111111-1',
      name: 'Carlos Fuentes',
      phone: 56912345678,
      treatments: Faker.datatype.number(),
      nextMeeting: Faker.date.future().toLocaleDateString()
    }))

const patients2 = () => (
  Array.from({ length: 105 }, (item, index) => ({
    id: index,
    name: Faker.name.findName(),
    treatments: Faker.datatype.number(),
    nextMeeting: Faker.date.future().toLocaleDateString()
  })
  ))

const evolutions = () => ([
  {
    id: 2,
    date: '23 de mayo de 2021',
    author: 'Jose Perez',
    description: 'Paciente consulta por dolor de diente 2.5\nSe toma rx y se deriva a endodoncia.\nse deja con amoxicilina e ibuprofeno'
  },
  {
    id: 1,
    date: '22 de mayo de 2021',
    author: 'Carlos Fuentes',
    description: 'Paciente consulta por dolor de diente 2.5\nSe toma rx y se deriva a endodoncia.\nse deja con amoxicilina e ibuprofeno'
  },
  {
    id: 0,
    date: '21 de mayo de 2021',
    author: 'Fernando Neira',
    description: 'Paciente consulta por dolor de diente 2.5\nSe toma rx y se deriva a endodoncia.\nse deja con amoxicilina e ibuprofeno'
  }
])

const radiographs = () => ([
  {
    id: 2,
    link: '#',
    date: '23 de mayo de 2021',
    author: 'Jose Perez',
    piece: 'Segundo molar',
    description: 'Se detectan alteraciones en molar'
  },
  {
    id: 1,
    link: '#',
    date: '22 de mayo de 2021',
    author: 'Carlos Fuentes',
    piece: 'Segundo molar',
    description: 'Se detectan alteraciones en molar'
  },
  {
    id: 0,
    link: '#',
    date: '21 de mayo de 2021',
    author: 'Fernando Neira',
    piece: 'Segundo molar',
    description: 'Se detectan alteraciones en molar'
  }
])

const treatments = () => ([
  {
    id: 2,
    treatment: 'Tramatiento x',
    startDate: '23 de mayo de 2021',
    lastDate: '23 de mayo de 2021',
    author: 'Jose Perez',
    specialty: 'General',
    status: 'En proceso'
  },
  {
    id: 1,
    treatment: 'Tratamiento y',
    startDate: '22 de mayo de 2021',
    lastDate: '23 de mayo de 2021',
    author: 'Carlos Fuentes',
    specialty: 'General',
    status: 'Finalizado'
  },
  {
    id: 0,
    treatment: 'Tratamiento z',
    startDate: '21 de mayo de 2021',
    lastDate: '23 de mayo de 2021',
    author: 'Fernando Neira',
    specialty: 'General',
    status: 'Finalizado'
  }
])

const inventory = () => ([
  { id: 0, code: 'INS1', name: 'Alfa Dental / Hertz 30cc', quantity: 10, avalaibleQuantity: 6, price: 7300 },
  { id: 1, code: 'INS2', name: 'Hilo Dental / ??', quantity: 10, avalaibleQuantity: 6, price: 7300 },
  { id: 2, code: 'INS3', name: 'Enjuague bucal / Listerine', quantity: 10, avalaibleQuantity: 6, price: 7300 }
])

const treatmentDetails = () => ({
  details: [
    { id: 0, title: 'Dertartraje', piece: 'Todas', price: '$22.000', paymentStatus: 'Pagado' },
    { id: 1, title: 'Endodoncia', piece: '1.1', price: '$27.000', paymentStatus: 'Pagado' },
    { id: 2, title: 'Composite', piece: '1.6', price: '$28.000', paymentStatus: 'Pagado' },
    { id: 3, title: 'Composite', piece: '1.5', price: '$21.000', paymentStatus: 'Por pagar' },
    { id: 4, title: 'Composite', piece: '1.3', price: '$24.000', paymentStatus: 'Pagado' },
    { id: 5, title: 'Exodoncia', piece: '3.8', price: '$230.000', paymentStatus: 'Por pagar' }
  ]
})

const appointments = [
  {
    id: 0,
    title: 'Cita con Fernando Neira',
    startDate: new Date(2021, 5, 7, 10, 0),
    endDate: new Date(2021, 5, 7, 11, 0),
    patient: {
      id: '1000',
      name: 'Fernando Neira'
    },
    room: 'Box 01'
  },
  {
    id: 1,
    title: 'Cita con Persona 1',
    startDate: new Date(2021, 5, 7, 11, 0),
    endDate: new Date(2021, 5, 7, 12, 0),
    patient: {
      id: '1000',
      name: 'Persona 1'
    },
    room: 'Box 01'
  },
  {
    id: 1,
    title: 'Cita con Persona 2',
    startDate: new Date(2021, 5, 7, 14, 0),
    endDate: new Date(2021, 5, 7, 14, 30),
    patient: {
      id: '1000',
      name: 'Persona 2'
    },
    room: 'Box 01'
  },
  {
    id: 1,
    title: 'Cita con Carlos Fuentes',
    startDate: new Date(2021, 5, 8, 10, 0),
    endDate: new Date(2021, 5, 8, 11, 30),
    patient: {
      id: '1001',
      name: 'Carlos Fuentes'
    },
    room: 'Box 02'
  },
  {
    id: 1,
    title: 'Cita con Persona 3',
    startDate: new Date(2021, 5, 8, 12, 0),
    endDate: new Date(2021, 5, 8, 13, 0),
    patient: {
      id: '1001',
      name: 'Carlos Fuentes'
    },
    room: 'Box 02'
  },
  {
    id: 1,
    title: 'Cita con Persona 4',
    startDate: new Date(2021, 5, 8, 14, 0),
    endDate: new Date(2021, 5, 8, 15, 0),
    patient: {
      id: '1001',
      name: 'Carlos Fuentes'
    },
    room: 'Box 02'
  }
]

export const DataMock = {
  users,
  patients,
  patients2,
  evolutions,
  radiographs,
  treatments,
  inventory,
  treatmentDetails,
  appointments
}
