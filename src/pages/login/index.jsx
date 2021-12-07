import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authenticationService } from 'services'
import { Helmet } from 'react-helmet-async'
import styles from './styles'
import { useEffect, useState } from 'react'
import LoginForm from 'pages/login/components/LoginForm'
import FormWrapper from 'pages/login/components/FormWrapper'
import { useToasts } from 'react-toast-notifications'

const LoginPage = ({ classes, location, history }) => {
  const [message, setMesage] = useState()
  const { addToast } = useToasts()

  useEffect(() => {
    if (location.state && location.state.msg) {
      setMesage(location.state.msg)
    }

    if (authenticationService.currentUserValue) {
      history.replace('/')
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
          if (!['ROLE_ADMIN', 'ROLE_DENTIST'].includes(user.role)) {
            addToast('Tu cuenta no tiene acceso a esta plataforma.', { appearance: 'error', autoDismiss: true })
            setStatus('Tu cuenta no tiene acceso a esta plataforma.')
            setSubmitting(false)
            return
          }

          if (user.status !== 'Habilitado') {
            addToast('Tu cuenta esta deshabilitada.', { appearance: 'error', autoDismiss: true })
            setStatus('Tu cuenta se encuentra deshabilitada.')
            setSubmitting(false)
            return
          }

          addToast('Inicio de sesión correcto', { appearance: 'success', autoDismiss: true })
          history.replace('/')
        })
        .catch((error) => {
          setSubmitting(false)
          addToast(error?.response?.data?.code === 'AUTH001' ? 'Usuario o contraseña incorrectos.' : 'Error al autenticar.', { appearance: 'error', autoDismiss: true })
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
        <span>{message}</span>
        <LoginForm classes={classes} formik={formik} />
      </FormWrapper>

    </>
  )
}

export default withRouter(withStyles(styles)(LoginPage))
