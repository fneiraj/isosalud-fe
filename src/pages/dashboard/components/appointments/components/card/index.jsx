import { Box, Card, CardContent, CardHeader, Grid, Link as MuiLink, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Scrollable from 'components/scrollable'
import dateUtils from 'utils/date-utils'

const HeaderCard = ({ id, startDate, endDate }) => {
  const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
  const endDateParsed = dateUtils.parse(endDate, 'yyyy-MM-dd HH:mm')
  const startHour = dateUtils.format(startDateParsed, 'HH:mm')
  const endHour = dateUtils.format(endDateParsed, 'HH:mm')

  return (
    <div style={{ backgroundColor: '#30a8e7', color: '#ffffff', paddingTop: '15px', paddingBottom: '15px' }}>
      <Typography style={{ marginLeft: '15px', marginRight: '15px' }}>
        {`${startHour} a ${endHour}`}
        <MuiLink
          style={{ color: '#ffffff', float: 'right' }}
          component={Link}
          to={`/mis-citas/detalle/${id}`}
        >
          Detalles
        </MuiLink>
      </Typography>
    </div>
  )
}

const BodyCard = ({ id, startDate, endDate, patient, comment }) => (
  <Card variant='outlined' style={{ width: '100%', minHeight: '200px', marginBottom: 15 }}>
    <CardHeader component={() => <HeaderCard id={id} startDate={startDate} endDate={endDate} />} />
    <CardContent>
      <Typography color='textSecondary'>
        {`${patient?.firstName} ${patient?.lastName}`}
      </Typography>
      <Typography variant='body2' component='p' style={{ marginTop: 15 }}>
        {`${comment}`}
      </Typography>
    </CardContent>
  </Card>
)

const AppointmentCard = ({ appointments, mobil } = {}) => {
  const RenderDesktop = () => (
    <Grid container spacing={2} direction='row'>
      {appointments.map(visit => (
        <Grid item key={visit.id} style={{ width: '233px' }}>
          <BodyCard {...visit} />
        </Grid>
      ))}
    </Grid>
  )

  const RenderMobil = () => (
    <Scrollable>
      <Box style={{ maxHeight: '100vh', overflow: 'auto' }}>
        <Grid container direction='row' wrap='nowrap'>
          {appointments.map(visit => (
            <Grid item key={visit.id} style={{ width: '233px' }}>
              <BodyCard {...visit} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Scrollable>
  )

  return mobil ? <RenderMobil /> : <RenderDesktop />
}

export default AppointmentCard
