import {
  AdminCalendarPage,
  DashboardAdmin,
  DashboardPage,
  HomePage,
  InventoryPage,
  MyDatesPage,
  MyPatientsPage,
  PatientProfilePage,
  UsersPage,
  UserProfilePage,
  MyProfilePage
} from 'pages'

import {
  EvolutionsPage,
  FilesPage,
  TreatmentsPage
} from 'pages/patient-profile/sub-pages'

import {
  GeneralOptionsPage
} from 'pages/site-options'

import { Role } from 'models/Role'
import { NotificationsCallOptionsPage, NotificationsSmsOptionsPage } from 'pages/site-options/pages/notifications'

export const privateRoutes = [
  {
    path: '/',
    component: DashboardPage,
    exact: true
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/admin',
    component: DashboardAdmin,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: '/admin/configuracion-sitio/general',
    component: GeneralOptionsPage,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: '/admin/configuracion-sitio/notificaciones/sms',
    component: NotificationsSmsOptionsPage,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: '/admin/configuracion-sitio/notificaciones/llamadas',
    component: NotificationsCallOptionsPage,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: '/admin/calendario',
    component: AdminCalendarPage,
    roles: [Role.Admin]
  },
  {
    path: '/admin/usuarios',
    component: UsersPage,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: '/admin/usuarios/:id',
    component: UserProfilePage,
    exact: true
  },
  {
    path: '/mis-citas',
    component: MyDatesPage,
    exact: true
  },
  {
    path: '/pacientes',
    component: MyPatientsPage,
    exact: true
  },
  {
    path: '/inventario',
    component: InventoryPage
  },
  {
    path: '/dashboard',
    component: DashboardPage
  },
  {
    path: '/pacientes/:id',
    component: PatientProfilePage,
    exact: true
  },
  {
    path: '/pacientes/:id/ficha-clinica/evoluciones',
    component: EvolutionsPage,
    exact: true
  },
  {
    path: '/pacientes/:id/ficha-clinica/archivos',
    component: FilesPage,
    exact: true
  },
  {
    path: '/pacientes/:id/planes-tratamiento',
    component: TreatmentsPage,
    exact: true
  },
  {
    path: '/mi-perfil',
    component: MyProfilePage,
    exact: true
  }
]
