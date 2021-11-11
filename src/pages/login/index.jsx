import { withStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authenticationService } from 'services'
import { Helmet } from 'react-helmet-async'
import styles from './styles'
import { useEffect } from 'react'
import LoginForm from 'pages/login/components/LoginForm'
import FormWrapper from 'pages/login/components/FormWrapper'

const LoginPage = ({ classes, location, history }) => {
  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push('/')
    }
  }, [history])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false
    },
    validationSchema:
      Yup.object().shape({
        username: Yup.string().required('Debes ingresar tu nombre de usuario.'),
        password: Yup.string().required('Debes ingresar tu contraseña.')
      }),
    onSubmit ({ username, password, rememberMe }, { setStatus, setSubmitting }) {
      setStatus()
      authenticationService.login(username, password)
        .then(async (user) => {
          // const { from } = location.state || { from: { pathname: '/' } }
          console.log('successfull login')
          history.push('/')
        })
        .catch((error) => {
          setSubmitting(false)

          console.log(error)

          setStatus(error?.response?.data?.code === 'AUTH001' ? 'Usuario o contraseña incorrectos.' : 'Error al autenticar.')
        })
    }
  })

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | ISOSALUD</title>
      </Helmet>

      <FormWrapper classes={classes} status={formik.status}>
        <LoginForm classes={classes} formik={formik} />
      </FormWrapper>

    </>
  )
}

export default withStyles(styles)(LoginPage)
