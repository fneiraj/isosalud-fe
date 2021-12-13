export const redirectRoutes = [
  {
    from: '/pacientes/:id/ficha-clinica',
    to: '/pacientes/:id/ficha-clinica/evoluciones',
    exact: true
  },
  {
    from: '/admin/configuracion-sitio',
    to: '/admin/configuracion-sitio/general',
    exact: true
  },
  {
    from: '/admin/configuracion-sitio/notificaciones',
    to: '/admin/configuracion-sitio/notificaciones/sms',
    exact: true
  },
  {
    to: '/error/404'
  }
]
