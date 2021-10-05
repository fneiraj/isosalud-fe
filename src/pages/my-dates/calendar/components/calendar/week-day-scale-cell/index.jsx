import { MonthView } from '@devexpress/dx-react-scheduler-material-ui'

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}
  />
)

export default DayScaleCell
