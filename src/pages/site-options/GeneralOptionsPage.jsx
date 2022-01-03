/* eslint-disable */
import { Grid, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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

const GeneralOptionsPage = ({classes}) => {
  return (
    <Paper className={classes.root}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <header />
            </Grid>
            <Grid item xs={12} style={{marginTop: 30}}>
              <nextAppointments />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div style={{width: '85%'}}>
          <reminders />

          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(GeneralOptionsPage)
