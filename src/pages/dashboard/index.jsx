/* eslint-disable */
import { Grid, Paper, Typography } from '@material-ui/core'
import Visits from 'pages/dashboard/components/appointments'
import Reminders from 'pages/dashboard/components/reminders'
import Header from './components/Header'
import NextAppointments from './components/NextAppointments'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const styles = {
  root: {
    width: '100%',
    height: '100%',
    //    marginTop: theme.spacing(3)
    paddingTop: 15,
    overflowX: 'hidden'
  },
  container: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  },
}

const Dashboard = ({classes}) => {
  return (
    <Paper className={classes.root}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12} style={{marginTop: 30}}>
              <NextAppointments />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div style={{width: '85%'}}>
          <Reminders />

          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(Dashboard)
