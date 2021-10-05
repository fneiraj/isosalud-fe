import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import DateFnsAdapter from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core'

const dateFnsInstance = new DateFnsAdapter()

const useStyles = makeStyles((theme) => ({
  cursorNotAllowed: {
    cursor: 'not-allowed'
  },
  cursorPointer: {
    cursor: 'pointer'
  }
}))

const WeekTimeTableCell = ({ onDoubleClick, ...restProps }) => {
  const { startDate } = restProps
  const classes = useStyles()
  const isBefore = dateFnsInstance.isBefore(new Date(), startDate)

  return (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={isBefore ? onDoubleClick : undefined}
      className={isBefore ? classes.cursorPointer : classes.cursorNotAllowed}
    />
  )
}

export default WeekTimeTableCell
