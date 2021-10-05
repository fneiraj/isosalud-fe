import { withStyles } from '@material-ui/core'
import styles from 'pages/my-dates/calendar/styles'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'

const Appointment = ({ classes, ...restProps }) => (
  <Appointments.Appointment {...restProps} className={classes.appointment} />
)

export default withStyles(styles, { name: 'Appointment' })(Appointment)
