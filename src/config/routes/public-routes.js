import { ForbiddenPage, LoginPage, NotFoundPage } from 'pages'

export const publicRoutes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/error/403',
    component: ForbiddenPage
  },
  {
    path: '/error/404',
    component: NotFoundPage
  }
]
