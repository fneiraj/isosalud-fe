import { withStyles } from '@material-ui/core'
import styles from 'pages/my-dates/calendar/styles'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'

const AppointmentContent = withStyles(styles, {
  name: 'AppointmentContent'
})(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
))

export default AppointmentContent
