import { Grid, Typography } from '@material-ui/core'

const AppointmentTooltipContent = ({ appointmentData }) => {
  // eslint-disable-next-line no-unused-vars
  const { author, box, comment, endDate, id, patient, startDate, title } = appointmentData

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h6'>
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default AppointmentTooltipContent
