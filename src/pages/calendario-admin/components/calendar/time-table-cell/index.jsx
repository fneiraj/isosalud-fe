import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import DateFnsAdapter from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core'
import esLocale from 'date-fns/locale/es/'
import clsx from 'clsx'

const dateFnsInstance = new DateFnsAdapter({ locale: esLocale })

const useStyles = makeStyles((theme) => ({
  cursorNotAllowed: {
    cursor: 'not-allowed'
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  nonHabil: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  }
}))

const WeekTimeTableCell = ({ onDoubleClick, feriados, ...restProps }) => {
  const { startDate } = restProps
  const classes = useStyles()
  const isBefore = dateFnsInstance.isBefore(new Date(), startDate)
  const isHabil = startDate.getDay() !== 6 && startDate.getDay() !== 0
  const isFeriado = feriados.map(feriado => feriado.fecha).includes(dateFnsInstance.format(startDate, 'yyyy-MM-dd'))

  return (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={isBefore && isHabil && !isFeriado ? onDoubleClick : undefined}
      className={isBefore && isHabil && !isFeriado ? classes.cursorPointer : clsx(classes.cursorNotAllowed, classes.nonHabil)}
    />
  )
}

export default WeekTimeTableCell
