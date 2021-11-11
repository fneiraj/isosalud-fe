import { authenticationService } from '../services'

export const authHeader = () => {
  // return authorization header with jwt token
  const tokens = authenticationService.currentUserTokenValue
  if (tokens && tokens.accessToken) {
    return { Authorization: `Bearer ${tokens.accessToken}` }
  } else {
    return {}
  }
}
