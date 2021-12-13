/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import dateUtils from 'utils/date-fns-utils'

const ConfirmationForm = ({
  displayAppointmentData,
  preloadData
}) => {
  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Resumen tratamiento<br /></Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Nombre:</b> {`${displayAppointmentData?.firstName} ${displayAppointmentData?.lastName}`}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>RUT:</b> {displayAppointmentData?.rut} </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Fecha de nacimiento:</b> .</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Email:</b> {displayAppointmentData?.email}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Celular:</b> {displayAppointmentData?.cellphone} </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Telefono:</b> {displayAppointmentData?.phone !== undefined ? displayAppointmentData?.phone : 'Sin telefono'}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Rol usuario:</b> {displayAppointmentData?.roleName}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Usuario:</b> {preloadData?.username}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Contraseña:</b> {preloadData?.username}</Typography>
      </Grid>

    </Grid>
  )
}

export default ConfirmationForm
