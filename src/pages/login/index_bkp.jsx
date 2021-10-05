import { ThemeProvider, withStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authenticationService } from '../../services'
import { Helmet } from 'react-helmet-async'
import { Box } from '@material-ui/core'
import styles from './styles'
import defaultTheme from '../../theme'
import Copyright from '../../components/copyright'
import { useEffect } from 'react'

const LoginPage = ({ classes, location, history }) => {

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push('/')
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false
    },
    validationSchema:
      Yup.object().shape({
        username: Yup.string().required('Debes ingresar el nombre de usuario.'),
        password: Yup.string().required('Debes ingresar la contraseña.')
      }),
    onSubmit ({ username, password, rememberMe }, { setStatus, setSubmitting }) {
      setStatus()
      authenticationService.login(username, password)
        .then(
          user => {
            const { from } = location.state || { from: { pathname: '/' } }
            history.push(from)
          },
          error => {
            setSubmitting(false)
            setStatus(error)
          }
        )
    }
  })

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | ISOSALUD</title>
      </Helmet>

      <ThemeProvider theme={defaultTheme}>
        <div>
          <div className={classes.loginContainer}>
            <Paper className={classes.paper}>
              {
                formik.status &&
                <div className={classes.errorCard}>
                  <Alert severity="error">{formik.status}</Alert>
                </div>
              }
              <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
                <TextField
                  name="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.errors.username && formik.touched.username}
                  helperText={formik.errors.username}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Nombre de usuario"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  error={formik.errors.password && formik.touched.password}
                  helperText={formik.errors.password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  name="rememberMe"
                  id="rememberMe"
                  value={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Recordarme"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                  className={classes.submit}
                  type={'submit'}
                >
                  Ingresar

                </Button>
                <Box mt={5}>
                  <Copyright/>
                </Box>
              </form>
            </Paper>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default withStyles(styles)(LoginPage)
