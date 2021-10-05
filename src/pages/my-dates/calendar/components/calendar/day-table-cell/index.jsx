import { DayView } from '@devexpress/dx-react-scheduler-material-ui'
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

const DayTimeTableCell = ({ onDoubleClick, ...restProps }) => {
  const { startDate } = restProps
  const classes = useStyles()
  const isBefore = dateFnsInstance.isBefore(new Date(), startDate)

  return (
    <DayView.TimeTableCell
      {...restProps}
      onDoubleClick={isBefore ? onDoubleClick : undefined}
      className={isBefore ? classes.cursorPointer : classes.cursorNotAllowed}
    />
  )
}

export default DayTimeTableCell
