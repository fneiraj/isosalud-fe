import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AppointmentCard from 'pages/dashboard/components/appointments/components/card'
import { useEffect, useState } from 'react'
import { appointmentService } from 'services/appointment/AppointmentService'
import dateUtils from 'utils/date-utils'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])

  const isToday = ({ startDate }) => {
    const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
    return dateUtils.isSameDay(new Date(), startDateParsed)
  }

  useEffect(() => {
    appointmentService.getAllOwn()
      .then(response => {
        setAppointments(response.data.data.filter(a => isToday(a)))
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <Typography>
            <span style={{ fontWeight: 400, fontSize: '25px' }}>Citas de hoy</span>
            <span style={{ marginLeft: 30 }}>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/mis-citas'
              >
                Todas las citas
              </Button>
            </span>
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Hidden smUp implementation='js'>
          <AppointmentCard appointments={appointments} mobil />
        </Hidden>
        <Hidden xsDown implementation='css'>
          <AppointmentCard appointments={appointments} />
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default Appointments
