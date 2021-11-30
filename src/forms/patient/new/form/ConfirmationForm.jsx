import { Grid, Typography } from '@material-ui/core'
import DateFnsAdapter from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es/'

const dateFnsInstance = new DateFnsAdapter({ locale: esLocale })

const ConfirmationForm = ({
  classes,
  cancelChanges,
  isNewAppointment,
  textEditorProps,
  pickerEditorPropsStartDate,
  pickerEditorProps,
  displayAppointmentData,
  changeAppointment,
  visibleChange,
  commitAppointment,
  applyChanges
}) => {
  const startDateParsed = (displayAppointmentData?.startDate instanceof Date) ? displayAppointmentData?.startDate : dateFnsInstance.parse(displayAppointmentData?.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX')
  const endDateParsed = (displayAppointmentData?.endDate instanceof Date) ? displayAppointmentData?.endDate : dateFnsInstance.parse(displayAppointmentData?.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX')

  const startDateFormatted = dateFnsInstance.format(startDateParsed, 'EEEE dd \'de\' LLLL \'del\' yyyy \'desde\' HH:mm')
  const endDateFormatted = dateFnsInstance.format(endDateParsed, 'HH:mm')

  const patientFirstname = displayAppointmentData?.patient?.firstName !== undefined ? displayAppointmentData?.patient?.firstName : displayAppointmentData?.patient?.personInfo?.firstName
  const patientLastname = displayAppointmentData?.patient?.lastName !== undefined ? displayAppointmentData?.patient?.lastName : displayAppointmentData?.patient?.personInfo?.lastName
  const patientRut = displayAppointmentData?.patient?.rut !== undefined ? displayAppointmentData?.patient?.rut : displayAppointmentData?.patient?.personInfo?.rut

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
        <Typography><b>Email:</b> {displayAppointmentData?.patient?.email}.</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography><b>Celular:</b> {displayAppointmentData?.patient?.cellphone}.</Typography>
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

    </Grid>
  )
}

export default ConfirmationForm
