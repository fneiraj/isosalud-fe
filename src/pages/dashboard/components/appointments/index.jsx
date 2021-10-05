import {
  Button,
  Grid, Hidden,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import AppointmentCard from 'pages/dashboard/components/appointments/components/card'

const visitsArr = [
  {
    id: '111',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico'
  },
  {
    id: '111',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico'
  },
  {
    id: '111',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico'
  },
  {
    id: '111',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico'
  },
  {
    id: '111',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico'
  }
]

const Appointments = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <Typography>
            <span style={{ fontWeight: 400, fontSize: '25px' }}>Citas</span>
            <span style={{ marginLeft: 30 }}>
              <Link
                component={Button}
                variant='contained'
                color='primary'
                to='/mis-citas'
              >
                Todas las citas
              </Link>
            </span>
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Hidden smUp implementation='js'>
          <AppointmentCard visitsArr={visitsArr} mobil />
        </Hidden>
        <Hidden xsDown implementation='css'>
          <AppointmentCard visitsArr={visitsArr} />
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default Appointments
