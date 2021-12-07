import { IconButton, makeStyles } from '@material-ui/core'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center'
  },
  icon: {
  }
}))

const AppointmentTooltipHeader = ({ appointmentData, commitChanges, ...rest }) => {
  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  const { author, box, comment, endDate, id, patient, startDate, title } = appointmentData

  console.log({ box })

  return (
    <AppointmentTooltip.Header
      {...rest}
      appointmentData={appointmentData}
      showDeleteButton={false}
    >
      <IconButton
        onClick={() => {
          commitChanges({ cancel: id })
        }}
        className={classes.commandButton}
      >
        <CancelOutlinedIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  )
}

export default AppointmentTooltipHeader
