import {
  Grid, Hidden, Paper,
  Typography
} from '@material-ui/core'
import RemindersCard from 'pages/dashboard/components/reminders/components/card'
import Scrollable from 'components/scrollable'
import { useState } from 'react'
import IconClickable from 'components/icon-clickable'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const remindersArr = [
  {
    id: '1',
    time: '10:00 AM',
    author: 'Fernando Neira',
    description: 'Cita para diagnostico 1'
  },
  {
    id: '2',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 2'
  },
  {
    id: '3',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 3'
  },
  {
    id: '4',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 4'
  },
  {
    id: '5',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 5'
  },
  {
    id: '6',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 6'
  },
  {
    id: '7',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 7'
  },
  {
    id: '8',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 8'
  },
  {
    id: '9',
    time: '10:00 AM',
    patient: 'Fernando Neira',
    description: 'Cita para diagnostico 9'
  }
]

const Reminders = () => {
  const [reminders, setReminders] = useState(remindersArr)

  return (
    <Grid container spacing={2} component={Paper} variant='outlined' style={{ backgroundColor: 'transparent' }}>
      <Grid item xs={12}>
        <div>
          <Typography>
            <span style={{ fontWeight: 400, fontSize: '25px' }}>Recordatorios</span>
            <span style={{ float: 'right' }}>
              <IconClickable Icon={AddCircleIcon} style={{ fill: '#30a8e7' }} onClick={() => window.alert('add one')} />
            </span>
          </Typography>
        </div>
      </Grid>
      <Grid item style={{ height: '70vh' }}>
        <Scrollable maxHeight='100%'>
          <Hidden smUp implementation='js'>
            <RemindersCard visitsArr={reminders} setVisitArr={setReminders} mobil />
          </Hidden>
          <Hidden xsDown implementation='css'>
            <RemindersCard visitsArr={reminders} setVisitArr={setReminders} />
          </Hidden>
        </Scrollable>
      </Grid>
    </Grid>
  )
}

export default Reminders
