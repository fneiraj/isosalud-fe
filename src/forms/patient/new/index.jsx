import { Grid, makeStyles, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const FormNewPatient = () => {
  const classes = useStyles()

  const styles = {}

  const userEmpty = {
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    convenio: '',
    sexo: '',
    dateOfBirth: '',
    phone: '',
    cellPhone: '',
    address: '',
    commune: '',
    city: ''
  }

  const [userData, setUserData] = useState(userEmpty)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData,
    validationSchema:
      Yup.object().shape({
        firstName: Yup.string().required('Debes ingresar el nombre de usuario.'),
        lastName: Yup.string().required('Debes ingresar la contraseña.'),
        rut: Yup.string().required('Debes ingresar el rut'),
        email: Yup.string().optional(),
        convenio: Yup.string().required('Debes ingresar el convenio'),
        sexo: Yup.string().required(),
        dateOfBirth: Yup.string().required(),
        phone: Yup.string().required(),
        cellPhone: Yup.string().required(),
        address: Yup.string().optional(),
        commune: Yup.string().optional(),
        city: Yup.string().optional()
      }),
    onSubmit (user, { setStatus, setSubmitting }) {
      setStatus()
      /*      userService.updatePatient(user)
                .then(
                    user => {
                        console.log('actualizado')
                    },
                    error => {
                        setStatus(error);
                    }
                );
                */
      setUserData({ ...userData, ...user })
      setSubmitting(false)
    }
  })

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      <Grid item xs={12}>
        <Grid container justify='flex-start' spacing={4}>
          <Grid key='firstName' item>
            <TextField
              name='firstName'
              id='firstName'
              label='Nombres'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.errors.firstName && formik.touched.firstName}
              helperText={formik.errors.firstName}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='lastName' item>
            <TextField
              name='lastName'
              id='lastName'
              label='Apellidos'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.errors.lastName && formik.touched.lastName}
              helperText={formik.errors.lastName}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='rut' item>
            <TextField
              name='rut'
              id='rut'
              label='RUT'
              value={formik.values.rut}
              onChange={formik.handleChange}
              error={formik.errors.rut && formik.touched.rut}
              helperText={formik.errors.rut}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
        <Grid container justify='flex-start' spacing={4}>
          <Grid key='email' item>
            <TextField
              name='email'
              id='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email}
              helperText={formik.errors.email}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='convenio' item>
            <TextField
              name='convenio'
              id='convenio'
              label='Convenio'
              value={formik.values.convenio}
              onChange={formik.handleChange}
              error={formik.errors.convenio && formik.touched.convenio}
              helperText={formik.errors.convenio}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='sexo' item>
            <TextField
              name='sexo'
              id='sexo'
              label='Sexo'
              value={formik.values.sexo}
              onChange={formik.handleChange}
              error={formik.errors.sexo && formik.touched.sexo}
              helperText={formik.errors.sexo}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
        <Grid container justify='flex-start' spacing={4}>
          <Grid key='dateOfBirth' item>
            <TextField
              name='dateOfBirth'
              id='dateOfBirth'
              label='Fecha de nacimiento'
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
              helperText={formik.errors.dateOfBirth}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='phone' item>
            <TextField
              name='phone'
              id='phone'
              label='Telefono'
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone && formik.touched.phone}
              helperText={formik.errors.phone}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='cellPhone' item>
            <TextField
              name='cellPhone'
              id='cellPhone'
              label='Celular'
              value={formik.values.cellPhone}
              onChange={formik.handleChange}
              error={formik.errors.cellPhone && formik.touched.cellPhone}
              helperText={formik.errors.cellPhone}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
        <Grid container justify='flex-start' spacing={4}>
          <Grid key='address' item>
            <TextField
              name='address'
              id='address'
              label='Direccion'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address && formik.touched.address}
              helperText={formik.errors.address}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='commune' item>
            <TextField
              name='commune'
              id='commune'
              label='Comuna'
              value={formik.values.commune}
              onChange={formik.handleChange}
              error={formik.errors.commune && formik.touched.commune}
              helperText={formik.errors.commune}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='city' item>
            <TextField
              name='city'
              id='city'
              label='Ciudad'
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.errors.city && formik.touched.city}
              helperText={formik.errors.city}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default FormNewPatient
