import { Box, Card, CardContent, CardHeader, Grid, Link as MuiLink, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Scrollable from 'components/scrollable'
import dateUtils from 'utils/date-fns-utils'

const HeaderCard = ({ id, startDate, endDate }) => {
  const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
  const endDateParsed = dateUtils.parse(endDate, 'yyyy-MM-dd HH:mm')
  const startHour = dateUtils.format(startDateParsed, 'HH:mm')
  const endHour = dateUtils.format(endDateParsed, 'HH:mm')

  return (
    <div style={{ backgroundColor: '#30a8e7', color: '#ffffff', paddingTop: '15px', paddingBottom: '15px', minWidth: '100%' }}>
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

const BodyCard = ({ id, startDate, endDate, title, type, patient, comment }) => (
  <Card variant='outlined' style={{ minHeight: '200px', minWidth: '100%', marginBottom: 15 }}>
    <CardHeader component={() => <HeaderCard id={id} startDate={startDate} endDate={endDate} />} />
    <CardContent>
      <Typography>
        {title}
      </Typography>
      <Typography color='textSecondary'>
        {`${patient?.personInfo?.firstName} ${patient?.personInfo?.lastName}`}
      </Typography>
      <Typography color='textSecondary'>
        {type.name}
      </Typography>
      <Typography variant='body2' component='p' style={{ marginTop: 15 }}>
        {comment || 'Sin comentarios.'}
      </Typography>
    </CardContent>
  </Card>
)

const EmptyState = () => {
  return (
    <Grid container>
      <Grid item>
        Sin citas
      </Grid>
    </Grid>
  )
}

const AppointmentCard = ({ appointments, mobil } = {}) => {
  if (appointments.length < 0) {
    return <EmptyState />
  }

  const RenderDesktop = () => (
    <Grid container spacing={2} direction='row'>
      {appointments.map(visit => (
        <Grid item xs={12} key={visit.id} style={{ paddingLeft: 0, paddingRight: 0 }}>
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
