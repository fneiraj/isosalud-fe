import { Redirect, Route } from 'react-router-dom'
import App from '../app'
import { authenticationService } from 'services'

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest} render={props => {
      const currentUserTokens = authenticationService.currentUserTokenValue

      if (!currentUserTokens) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUserTokens.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/error/403' }} />
      }

      // authorised so return component
      return <App><Component {...props} /></App>
    }}
  />
)
