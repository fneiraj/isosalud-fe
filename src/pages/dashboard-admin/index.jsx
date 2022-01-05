/* eslint-disable */
import { Grid, Paper, Typography } from '@material-ui/core'
import Visits from 'pages/dashboard/components/appointments'
import Reminders from 'pages/dashboard/components/reminders'
import Header from './components/Header'
import NextAppointments from './components/NextAppointments'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import { useEffect, useState } from 'react'
import { adminService } from 'services/admin/AdminService'
import PatientsResume from './components/PatientResume'
import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ResumeGraphic from './components/ResumeGraphic'
import AppointmentGraphic from './components/AppointmentsGraphic'

const styles = {
  root: {
    width: '100%',
    height: '100%',
    //    marginTop: theme.spacing(3)
    paddingTop: 15,
    overflowX: 'hidden',
    overflowY: 'hidden'
  },
  container: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  },
}

const DashboardAdmin = ({ classes }) => {
  const [resume, setResume] = useState(undefined)

  useEffect(() => {
    adminService.getResume()
      .then(response => setResume(response.data))
      .catch(error => console.error(error))
  }, [])

  const data = [
    {
      name: 'Pacientes',
      ...resume?.patients
    },
    {
      name: 'Citas',
      ...resume?.appointments
    },
    {
      name: 'Tratamientos',
      ...resume?.treatment
    }
  ];

  return (
    <Paper className={classes.root}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <PatientsResume
                    key={'patients-resume-' + resume}
                    title={'Pacientes'}
                    data={resume?.patients}
                  />
                </Grid>
                <Grid item xs={4}>
                  <PatientsResume
                    key={'appointment-resume-' + resume}
                    title={'Citas'}
                    data={resume?.appointments}
                  />
                </Grid>
                <Grid item xs={4}>
                  <PatientsResume
                    key={'treatment-resume-' + resume}
                    title={'Tratamientos'}
                    data={resume?.treatment}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <AppointmentGraphic
                key={'appointments-resume-' + resume}
                data={resume?.appointmentsStates}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <ResumeGraphic 
                data={data} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(DashboardAdmin)
