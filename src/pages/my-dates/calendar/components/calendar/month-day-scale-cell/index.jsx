import { MonthView } from '@devexpress/dx-react-scheduler-material-ui'
import DateFnsAdapter from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core'
import { sub } from 'date-fns'

const dateFnsInstance = new DateFnsAdapter()

const useStyles = makeStyles((theme) => ({
  cursorNotAllowed: {
    cursor: 'not-allowed'
  },
  cursorPointer: {
    cursor: 'pointer'
  }
}))

const MonthTimeTableCell = ({ onDoubleClick, ...restProps }) => {
  const { startDate } = restProps
  const classes = useStyles()
  const isBefore = dateFnsInstance.isBefore(sub(new Date(), { days: 1 }), startDate)

  return (
    <MonthView.TimeTableCell
      {...restProps}
      onDoubleClick={isBefore ? onDoubleClick : undefined}
      className={isBefore ? classes.cursorPointer : classes.cursorNotAllowed}
    />
  )
}

export default MonthTimeTableCell
