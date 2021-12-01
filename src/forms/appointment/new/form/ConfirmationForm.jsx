import { Grid, Typography } from '@material-ui/core'
import DateFnsAdapter from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es/'

const dateFnsInstance = new DateFnsAdapter({ locale: esLocale })

const ConfirmationForm = ({
  displayAppointmentData
}) => {
  const startDateParsed = dateFnsInstance.parse(displayAppointmentData?.startDate, 'yyyy-MM-dd HH:mm')
  const endDateParsed = dateFnsInstance.parse(displayAppointmentData?.endDate, 'yyyy-MM-dd HH:mm')

  let startDateFormatted = null
  let endDateFormatted = null
  try {
    startDateFormatted = dateFnsInstance.format(startDateParsed || new Date(), 'EEEE dd \'de\' LLLL \'del\' yyyy \'desde\' HH:mm')
    endDateFormatted = dateFnsInstance.format(endDateParsed, 'HH:mm')
  } catch (error) {
    console.error(error)
  }

  const patientFirstname = displayAppointmentData?.patient?.firstName !== undefined ? displayAppointmentData?.patient?.firstName : displayAppointmentData?.patient?.personInfo?.firstName
  const patientLastname = displayAppointmentData?.patient?.lastName !== undefined ? displayAppointmentData?.patient?.lastName : displayAppointmentData?.patient?.personInfo?.lastName
  const patientRut = displayAppointmentData?.patient?.rut !== undefined ? displayAppointmentData?.patient?.rut : displayAppointmentData?.patient?.personInfo?.rut
  const patientEmail = displayAppointmentData?.patient?.email !== undefined ? displayAppointmentData?.patient?.email : displayAppointmentData?.patient?.personInfo?.email
  const patientCellphone = displayAppointmentData?.patient?.cellphone !== undefined ? displayAppointmentData?.patient?.cellphone : displayAppointmentData?.patient?.personInfo?.cellphone

  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Resumen cita<br /></Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Titulo cita:</b> {displayAppointmentData?.title}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Cuando:</b> {startDateFormatted} a {endDateFormatted}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Comentario:</b> <br /> {displayAppointmentData?.comment}</Typography>
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Datos paciente<br /></Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Nombre:</b> {`${patientFirstname} ${patientLastname}`}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>RUT:</b> {patientRut}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Email:</b> {patientEmail}.</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Celular:</b> {patientCellphone}.</Typography>
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

    </Grid>
  )
}

export default ConfirmationForm
