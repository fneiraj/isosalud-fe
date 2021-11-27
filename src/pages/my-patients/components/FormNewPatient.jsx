import { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Grid, Modal, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Close } from '@material-ui/icons'

const styles = theme => ({
  root: {
    width: '100%'
    //    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  modal: {
    marginTop: 70,
    marginBottom: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'scroll',
    width: '50%'
  },
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(1, 3, 2),
    width: '100%',
    height: '100%'
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  }
})
/*
const user = {
    firstName: 'Fernando', lastName: 'Neira', rut: '11.111.111-1',
    email: 'fe.neiraj@gmail.com', convenio: 'Isapre', sexo: 'masculino',
    dateOfBirth: '15/10/1999', phone: '+452222222', cellPhone: '+56999999999',
    address: 'Calle S/N #1234', commune: 'Temuco', city: 'Temuco'
}; */

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

const FormNewPatient = ({ classes, visible, toggleVisible }) => {
  const [userData, setUserData] = useState(userEmpty)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData,
    validationSchema:
      Yup.object().shape({
        rut: Yup.string().required('Debes ingresar el rut'),
        firstName: Yup.string().required('Debes ingresar el nombre de usuario.'),
        lastName: Yup.string().required('Debes ingresar la contraseña.'),
        email: Yup.string().optional(),
        convenio: Yup.string().required('Debes ingresar el convenio'), // add this to db
        sexo: Yup.string().required(), // add this to db
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

  const formNewPatient = () => {
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

  return (
    <Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={visible}
      onClose={toggleVisible}
      className={classes.modal}
    >
      <Paper className={classes.content}>
        <div className={classes.header}>
          <Typography>
            Nuevo paciente
          </Typography>
          <IconButton
            className={classes.closeButton}
            onClick={toggleVisible}
          >
            <Close color='action' />
          </IconButton>
        </div>
        <div>
          <div style={{ width: '100%', height: '100%' }}>
            {formNewPatient()}
          </div>

          <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
            <Button onClick={() => {
            }}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
              }}
              className={classes.button}
            >
              Crear
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  )
}

export default withStyles(styles)(FormNewPatient)
