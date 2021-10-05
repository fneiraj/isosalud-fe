import { Grid } from '@material-ui/core'
import Visits from 'pages/dashboard/components/appointments'
import Reminders from 'pages/dashboard/components/reminders'

const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Visits />
      </Grid>
      <Grid item xs={3}>
        <Reminders />
      </Grid>
    </Grid>
  )
}

export default Dashboard
