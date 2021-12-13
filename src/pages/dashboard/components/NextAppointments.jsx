/* eslint-disable */
import { useEffect, useState } from 'react'
import dateUtils from 'utils/date-fns-utils'
import { appointmentService } from 'services/appointment/AppointmentService'
import { Button, Card, CardContent, CssBaseline, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import dateFnsInstance from 'utils/date-fns-utils'
import { isSameWeek } from 'date-fns'
import useLocalStorage from 'hooks/useLocalStorage'

const NextAppointments = () => {
  const [data, setData] = useState([])
  const [appointments, setAppointments] = useState([])
  const [tabSelected, setTabSelected] = useLocalStorage('dashboard-next-dates-type', 0)

  const isToday = ({ startDate }) => {
    const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
    return dateUtils.isSameDay(new Date(), startDateParsed)
  }

  const isWeek = ({ startDate }) => {
    const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
    return isSameWeek(new Date(), startDateParsed)
  }

  const isMonth = ({ startDate }) => {
    const startDateParsed = dateUtils.parse(startDate, 'yyyy-MM-dd HH:mm')
    return dateUtils.isSameMonth(new Date(), startDateParsed)
  }

  const filterAcordingTab = (target) => {
    if (tabSelected === 0) {
      return target.filter(a => isToday(a))
    }
    if (tabSelected === 1) {
      return target.filter(a => isWeek(a))
    }
    if (tabSelected === 2) {
      return target.filter(a => isMonth(a))
    }
  }

  useEffect(() => {
    appointmentService.getAllOwn()
      .then(response => {
        setAppointments(filterAcordingTab(response.data.data))
        setData(response.data.data)
      })
      .catch(error => console.error(error))
  }, [])

  const EmptyState = () => (
    <>EmptyState</>
  )

  const Appointment = ({ box, comment, startDate, endDate, medic, patient, status, title, treatment, type }) => {
    const patientName = `${patient?.personInfo?.firstName} ${patient?.personInfo?.lastName}`
    const startDateParsed = dateFnsInstance.parse(startDate, 'yyyy-MM-dd HH:mm')
    const endDateParsed = dateFnsInstance.parse(endDate, 'yyyy-MM-dd HH:mm')

    const startDateFormatted = dateFnsInstance.format(startDateParsed, 'EEEE dd \'a las\' HH:mm')

    return (
      <Grid item xs={12}>
        <Card variant='outlined'>
          <CardContent>
            <Grid container>
              <Grid item>
                <Typography color='textSecondary' gutterBottom>
                  <b>Paciente:</b> {patientName}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography color='textSecondary' gutterBottom>
                  {startDateFormatted} hrs.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography color='textSecondary' style={{ whiteSpace: 'pre-line' }} gutterBottom>
                <b>Tratamiento:</b> {treatment?.specialization?.name || 'Sin tratamiento'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color='textSecondary' gutterBottom>
                <b>Comentarios:</b> {comment || 'Sin comentarios'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color='textSecondary'>
                <b>Tipo de cita:</b> {type?.name}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  const handleChangeTab = (event, newValue) => {
    setTabSelected(newValue)

    if (newValue === 0) {
      setAppointments(data.filter(a => isToday(a)))
    }
    if (newValue === 1) {
      setAppointments(data.filter(a => isWeek(a)))
    }
    if (newValue === 2) {
      setAppointments(data.filter(a => isMonth(a)))
    }

  }

  const Header = () => (
    <Paper>
      <Tabs
        value={tabSelected}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
      >
        <Tab label="Hoy" />
        <Tab label="Semana" />
        <Tab label="Mes" />
      </Tabs>
    </Paper>
  )


  return (
    <Grid container component={Paper} variant='outlined' style={{ backgroundColor: 'transparent', padding: 15 }}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Typography>
              Tus siguientes citas
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item xs={3} justifyContent='right' alignContent='right' alignItems='right'>
            <Header />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '100%', marginTop: 20 }}>
        <Grid container spacing={1}>
          {appointments && appointments.length > 0 ? appointments.map(a => <Appointment {...a} />) : <EmptyState />}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NextAppointments
