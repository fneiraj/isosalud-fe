/* eslint-disable */
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import styles from '../styles'
import { makeStyles } from '@material-ui/core/styles'
import dateUtils from 'utils/date-fns-utils'
import {Link} from 'react-router-dom'
import ChangePasswordModal from './ChangePasswordModal'
import { authenticationService } from 'services'
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.spacing(10)
  },
  bold: {
    fontWeight: 500
  }
}))

const PatientInfo2 = ({ isEditing, onContactClick, userData }) => {
  const classes = useStyles()
  const { addToast } = useToasts()

  const { personInfo: info = {} } = userData
  const { addressInfo: address = {} } = info

  const [isModalChangePasswordVisible, setIsModalChangePasswordVisible] = useState(false)

  const toggleIsModalChangePasswordVisible = () => {
    setIsModalChangePasswordVisible(prev => !prev)
  }

  const onUpdateCallback = (password) => {
    authenticationService.changePassword(password)
      .then(response => {
        addToast('Contraseña actualizada correctamente.', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        addToast('Error al actualizar la contraseña.', { appearance: 'error', autoDismiss: true })
      })
    toggleIsModalChangePasswordVisible()
  }

  const BasicInfo = () => (
    <Grid container alignItems='center' justify='center' direction='column'>
      <Grid item xs={12}>
        <Avatar
          className={classes.avatar}
          alt={`${info?.firstName} ${info?.lastName}`}
          src={userData?.profileImageUri}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 5 }}>
        <Typography className={classes.bold}>
          {`${info?.firstName} ${info?.lastName}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {info?.rut}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {info?.email}
        </Typography>
      </Grid>
    </Grid>
  )

  const AppointmentsInfo = () => (
    <Grid container alignItems='center' justify='center' direction='column'>
      <Grid item xs={12} style={{ marginTop: 15 }}>
        <Typography className={classes.bold}>
          Citas
        </Typography>
      </Grid>
    </Grid>
  )

  const ContactPatient = () => (
    <Grid container>
      <Grid item style={{ marginTop: 15 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleIsModalChangePasswordVisible}
        >
          Cambiar contraseña
        </Button>
      </Grid>
    </Grid>
  )

  const textFieldProps = {
    disabled: !isEditing,
    fullWidth: true,
    margin: 'normal',
    inputProps: { style: styles.labelEditText }
  }

  const dateRegisterFormatted = () => {
    if (!info?.dateCreated) return null

    const dateParsed = dateUtils.parse(info?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
    return dateUtils.format(dateParsed, 'dd-MM-yyyy')
  }

  const dateLastLogin = () => {
    if (!userData?.lastLogin) return null

    const dateParsed = dateUtils.parse(userData?.lastLogin, 'yyyy-MM-dd HH:mm:ss')
    return dateUtils.format(dateParsed, 'dd-MM-yyyy HH:mm:ss')
  }

  const dateRegister = () => {
    if (!userData?.dateCreated) return null

    const dateParsed = dateUtils.parse(userData?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
    return dateUtils.format(dateParsed, 'dd-MM-yyyy HH:mm:ss')
  }

  const rol = () => (
    userData?.roleName?.includes('ADMIN') ? 'Administrador' : userData?.roleName?.includes('DENTIST') ? 'Dentista' : 'Paciente'
  )

  const PersonalInfo = () => (
    <Grid container>
      <Grid item xs={5}>
        <TextField label='Identificador' value={userData.id} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Nombre de usuario' value={userData.username} {...textFieldProps} />
      </Grid>

      <Grid item xs={5}>
        <TextField label='Rol sistema' value={rol()} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Estado' value={userData.status} {...textFieldProps} />
      </Grid>
      
      <Grid item xs={5}>
        <TextField label='Fecha creación' value={dateRegister()} {...textFieldProps} />
      </Grid>
      <Grid item xs={2}/>
      <Grid item xs={5}>
        <TextField label='Ultimo acceso' value={dateLastLogin()} {...textFieldProps} />
      </Grid>
    </Grid>
  )

  return (
    <>
    <Card variant='outlined'>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item md={5} xs={12}>
            <Grid container alignItems='center' justify='center' direction='column'>
              <Grid item>
                <BasicInfo />
              </Grid>
              <Grid item>
                <ContactPatient />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Grid container alignItems='center' justify='center' direction='column'>
              <Grid item>
                <PersonalInfo />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <ChangePasswordModal 
      key={'change-password-modal-' + isModalChangePasswordVisible}
      classes={classes}  
      visible={isModalChangePasswordVisible}
      toggleVisible={toggleIsModalChangePasswordVisible}
      onUpdateCallback={onUpdateCallback}
    />
    </>
  )
}

export default PatientInfo2
