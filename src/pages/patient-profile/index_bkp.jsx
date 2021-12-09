import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import EventIcon from '@mui/icons-material/Event'
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DateRangeIcon from '@mui/icons-material/DateRange'
import styles from 'pages/patient-profile/styles'

const PatienteProfilePage = (props) => {
  const { classes } = props
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    firstName: 'Fernando',
    lastName: 'Neira',
    rut: '11.111.111-1',
    email: 'fe.neiraj@gmail.com',
    convenio: 'Isapre',
    sexo: 'masculino',
    dateOfBirth: '15/10/1999',
    phone: '+452222222',
    cellPhone: '+56999999999',
    address: 'Calle S/N #1234',
    commune: 'Temuco',
    city: 'Temuco'
  })

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
      handleEditing()
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

  const handleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    handleEditing()
    formik.resetForm()
  }

  const handleNewAppointment = () => {

  }

  const patientInfoBox = () => (
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )

  const editProfileButtons = () => (
    <Grid container spacing={1}>
      <Typography className={classes.title} color='textPrimary' gutterBottom>
        Datos pacientes
      </Typography>

      <Grid item xs />

      {isEditing
        ? <>
          <Grid key='cancel-action' item>
            <Button
              onClick={handleCancel}
              variant='contained'
              color='default'
              className={classes.button}
              endIcon={<CancelIcon />}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid key='save-action' item>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Grid>
          </>
        : <Grid key='edit-action' item>
          <Button
            onClick={handleEditing}
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<EditIcon />}
          >
            Editar
          </Button>
        </Grid>}
    </Grid>
  )

  const addNewAppointmentButton = () => (
    <Grid container spacing={1} style={{ marginBottom: 15 }}>
      <Typography className={classes.title} color='textPrimary' gutterBottom>
        Citas paciente
      </Typography>

      <Grid item xs />
      <Grid key='edit-action' item>
        <Button
          onClick={handleNewAppointment}
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<EventIcon />}
        >
          Nueva cita
        </Button>
      </Grid>
    </Grid>
  )

  const renderAppointment = ({ title, date }) => {
    return (
      <Paper>
        <span style={styles.iconSpan}>
          <div style={{ color: 'white' }}>
            <DateRangeIcon style={styles.icon} />
          </div>
        </span>
        <div style={styles.content}>
          <p style={styles.text}>{title}</p>
          <p>{date}</p>
        </div>
      </Paper>
    )
  }

  const citas = [
    {
      title: 'CITA 1',
      date: '29 de julio de 2020'
    }
  ]

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Grid container justify='flex-start' spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
          <Grid key={1} item xs={12}>
            <Card className='' variant='outlined'>
              <CardContent>
                {editProfileButtons()}
                {patientInfoBox()}
              </CardContent>
            </Card>
          </Grid>
          <Grid key={2} item xs={12}>
            <Card className='' variant='outlined'>
              <CardContent>
                {addNewAppointmentButton()}
                {citas.map(cita => (renderAppointment(cita)))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(PatienteProfilePage)
