import { HelmetProvider } from 'react-helmet-async'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { history } from 'helpers'
import { PrivateRoute } from 'routes/private-route'
import ScrollToTop from 'components/scroll-to-top'
import { privateRoutes, publicRoutes, redirectRoutes } from 'config/routes'

export default (
  <HelmetProvider>
    <ScrollToTop />
    <Router history={history}>
      <Switch>
        {publicRoutes.map(route => <Route key={route.path} {...route} />)}
        {privateRoutes.map(route => <PrivateRoute key={route.path} {...route} />)}
        {redirectRoutes.map(route => <Redirect key={route.path} {...route} />)}
      </Switch>
    </Router>
  </HelmetProvider>
)
