import { Grid, Typography } from '@material-ui/core'
import dateUtils from 'utils/date-utils'

const ConfirmationForm = ({
  displayAppointmentData,
  preloadData
}) => {
  // eslint-disable-next-line no-unused-vars
  const dateOfBirthParsed = (displayAppointmentData?.dateOfBirth instanceof Date) ? displayAppointmentData?.dateOfBirth : dateUtils.parse(displayAppointmentData?.dateOfBirth, 'yyyy-MM-dd')

  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Resumen usuario<br /></Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Nombre:</b> {`${displayAppointmentData?.firstName} ${displayAppointmentData?.lastName}`}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>RUT:</b> {displayAppointmentData?.rut} </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Fecha de nacimiento:</b> {displayAppointmentData?.dateOfBirth.toString()}.</Typography>
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
        <Typography><b>Medio de contacto preferido:</b> {displayAppointmentData?.preferredContactMeanName}</Typography>
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
