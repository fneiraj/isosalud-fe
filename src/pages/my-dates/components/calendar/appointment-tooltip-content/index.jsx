import { Grid, makeStyles } from '@material-ui/core'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center'
  },
  icon: {
  }
}))

const AppointmentTooltipContent = ({ appointmentData, ...rest }) => {
  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  const { author, box, comment, endDate, id, patient, startDate, title } = appointmentData

  const patientName = `${patient?.firstName} ${patient?.lastName}`

  console.log({ box })

  return (
    <AppointmentTooltip.Content {...rest} appointmentData={appointmentData}>
      <Grid container alignItems='center'>
        <Grid item xs={2} className={classes.textCenter}>
          <AccountCircleOutlinedIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{patientName}</span>
        </Grid>
      </Grid>
      <Grid container alignItems='center'>
        <Grid item xs={2} className={classes.textCenter}>
          <RoomOutlinedIcon />
        </Grid>
        <Grid item xs={10}>
          <span>{box?.name}</span>
        </Grid>
      </Grid>
      <Grid container alignItems='center'>
        <Grid item xs={2} className={classes.textCenter}>
          <ChatBubbleOutlineOutlinedIcon />
        </Grid>
        <Grid item xs={10}>
          <span>{comment}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  )
}

export default AppointmentTooltipContent
