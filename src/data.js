import Faker from 'faker'

const data = {
  tablePage: {
    items: Array.from({ length: 105 }, (item, index) => ({
      id: index,
      name: Faker.commerce.productName(),
      price: Faker.commerce.price(),
      category: Faker.commerce.productMaterial()
    }))
  },
  dashBoardPage: {
    nextAppointments: [
      {
        id: 1,
        title: 'Hoy a las 14:30',
        text: 'Carlos Fuentes.',
        specialization: 'Cirugía'
      },
      {
        id: 2,
        title: 'Hoy a las 15:00',
        text: 'Fernando Neira',
        specialization: 'Cirugía'
      },
      {
        id: 3,
        title: 'Hoy a las 16:00',
        text: 'Persona 1',
        specialization: 'Cirugía'
      },
      {
        id: 4,
        title: 'Hoy a las 17:00',
        text: 'Persona 2',
        specialization: 'Cirugía'
      },
      {
        id: 5,
        title: 'Hoy a las 17:30',
        text: 'Persona 3',
        specialization: 'Cirugía'
      }
    ],
    monthlySales: [
      { name: 'Jan', uv: 3700 },
      { name: 'Feb', uv: 3000 },
      { name: 'Mar', uv: 2000 },
      { name: 'Apr', uv: 2780 },
      { name: 'May', uv: 2000 },
      { name: 'Jun', uv: 1800 },
      { name: 'Jul', uv: 2600 },
      { name: 'Aug', uv: 2900 },
      { name: 'Sep', uv: 3500 },
      { name: 'Oct', uv: 3000 },
      { name: 'Nov', uv: 2400 },
      { name: 'Dec', uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    browserUsage: [
      { name: 'Chrome', value: 800 },
      { name: 'Firefox', value: 300 },
      { name: 'Safari', value: 300 }
    ]
  }
}

export default data
