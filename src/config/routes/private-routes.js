import {
  AdminCalendarPage,
  DashboardAdmin,
  DashboardPage, FormPage,
  HomePage, InventoryPage,
  MyDatesPage, MyPatientsPage, PatientProfilePage, RadiographsPage,
  ScheduleMeetPage, TreatmentPlansPage,
  UsersPage
} from 'pages'
import { Role } from 'models/Role'
import EvolutionsPage from 'pages/patient-profile/evolutions'
import MyProfilePage from 'pages/my-profile'
import BasicTables from 'pages/Table/BasicTables'
import DataTables from 'pages/Table/DataTables'

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
    path: '/admin/calendario',
    component: AdminCalendarPage,
    roles: [Role.Admin]
  },
  {
    path: '/admin/usuarios',
    component: UsersPage,
    roles: [Role.Admin]
  },
  {
    path: '/user',
    component: () => <>Soy user</>,
    roles: [Role.User]
  },
  {
    path: '/mis-citas',
    component: MyDatesPage,
    exact: true
  },
  {
    path: '/mis-citas/agendar',
    component: ScheduleMeetPage
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
    path: '/pacientes/:id/ficha-clinica/radiografias',
    component: RadiographsPage,
    exact: true
  },
  {
    path: '/pacientes/:id/planes-tratamiento',
    component: TreatmentPlansPage,
    exact: true
  },
  {
    path: '/mi-perfil',
    component: MyProfilePage,
    exact: true
  },
  {
    path: '/form',
    component: FormPage
  },
  {
    path: '/table/basic',
    component: BasicTables
  },
  {
    path: '/table/data',
    component: DataTables
  },
  {
    path: '/test',
    component: () => <></>
  }
]
