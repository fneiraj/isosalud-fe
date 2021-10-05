import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'

const TreatmentCard = ({ handleOpenDetails, id, treatment, startDate, lastDate, author, status, specialty }) => {
  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              #{id}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography color='textSecondary'>
              <b>Tratamiento:</b> {treatment}
            </Typography>
            <Typography color='textSecondary'>
              <b>Especialidad:</b> {specialty}
            </Typography>
            <Typography color='textSecondary'>
              <b>Estado:</b> {status}
            </Typography>
            <Typography color='textSecondary'>
              <b>Medico:</b> {author}
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
                onClick={() => handleOpenDetails(id)}
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