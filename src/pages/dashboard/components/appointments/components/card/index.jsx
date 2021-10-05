import { Box, Card, CardContent, CardHeader, Grid, Link as MuiLink, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Scrollable from 'components/scrollable'

const HeaderCard = ({ time }) => (
  <div style={{ backgroundColor: '#30a8e7', color: '#ffffff', paddingTop: '15px', paddingBottom: '15px' }}>
    <Typography style={{ marginLeft: '15px', marginRight: '15px' }}>
      {time}
      <MuiLink
        style={{ color: '#ffffff', float: 'right' }}
        component={Link}
        to='/appointments/'
      >
        Detalles
      </MuiLink>
    </Typography>
  </div>
)

const BodyCard = ({ id, time, patient, description }) => (
  <Card variant='outlined' style={{ width: '100%' }}>
    <CardHeader component={() => <HeaderCard time={time} />} />
    <CardContent>
      <Typography style={{ fontWeight: '300px' }}>
        {patient}
      </Typography>
      <Typography color='textSecondary' />
      <Typography variant='body2' component='p'>
        {description}
      </Typography>
    </CardContent>
  </Card>
)

const AppointmentCard = ({ visitsArr, mobil } = {}) => {
  const RenderDesktop = () => (
    <Grid container spacing={2} direction='row'>
      {visitsArr.map(visit => (
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
          {visitsArr.map(visit => (
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
