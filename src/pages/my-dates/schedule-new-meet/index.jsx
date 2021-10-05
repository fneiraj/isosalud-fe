import { grey } from '@material-ui/core/colors'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    width: '100%',
    height: '100%'
    //    marginTop: theme.spacing(3)
  },
  tableWrapper: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  },
  toggleDiv: {
    marginTop: 20,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey[400],
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  },
  labelEditText: {
    color: '#000',
    fontWeight: 'bold'
  }
}

const ScheduleMeetPage = (props) => {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <>Agendar cita contenido ---</>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(ScheduleMeetPage)
