import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'
import dateFnsInstance from 'utils/date-fns-utils'

const TreatmentCard = ({ handleOpenDetails, treatment }) => {
  console.log({ treatment })
  const medicName = `${treatment?.medic?.personInfo?.firstName} ${treatment?.medic?.personInfo?.lastName}`
  const specialty = treatment?.specialization?.name
  const status = treatment?.state?.name

  const startDateParsed = dateFnsInstance.parse(treatment?.startDate, 'yyyy-MM-dd HH:mm')
  const lastDateParsed = dateFnsInstance.parse(treatment?.lastMeeting, 'yyyy-MM-dd HH:mm')

  const startDate = (treatment?.startDate !== undefined && dateFnsInstance.isValid(startDateParsed)) ? dateFnsInstance.format(startDateParsed, 'dd-MM-yyy HH:mm a') : 'Sin registro'
  const lastDate = (treatment?.lastMeeting !== undefined && dateFnsInstance.isValid(lastDateParsed)) ? dateFnsInstance.format(lastDateParsed, 'dd-MM-yyy HH:mm a') : 'Sin registro'

  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography color='textSecondary'>
              <b>Tratamiento:</b> {treatment?.comment}
            </Typography>
            <Typography color='textSecondary'>
              <b>Especialidad:</b> {specialty}
            </Typography>
            <Typography color='textSecondary'>
              <b>Estado:</b> {status}
            </Typography>
            <Typography color='textSecondary'>
              <b>Medico:</b> {medicName}
            </Typography>
            <Typography color='textSecondary'>
              <b>Fecha de inicio:</b> {startDate}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              <b>Última cita:</b> {lastDate}
            </Typography>
          </Grid>
          <Grid item>
            <Grid key='downloadButton' item>
              <Button
                onClick={handleOpenDetails}
                variant='contained'
                color='primary'
                //              className={classes.button}
                endIcon={<ListAltIcon />}
              >
                Ver detalles
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TreatmentCard
