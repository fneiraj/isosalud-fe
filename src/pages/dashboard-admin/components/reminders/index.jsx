/* eslint-disable */
import {
  Grid, Hidden, Paper,
  Typography
} from '@material-ui/core'
import RemindersCard from 'pages/dashboard/components/reminders/components/card'
import Scrollable from 'components/scrollable'
import { useEffect, useState } from 'react'
import IconClickable from 'components/icon-clickable'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { notesService } from 'services/notes/NotesService'

const Reminders = () => {
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    notesService.getAll()
    .then(response => setReminders(response.data.data))
    .catch(error => console.error(error))
  }, [])

  return (
    <Grid container spacing={2} component={Paper} variant='outlined' style={{ backgroundColor: 'transparent'}}>
      <Grid item xs={12}>
        <div>
          <Typography>
            <span style={{ fontWeight: 400, fontSize: '25px' }}>Notas</span>
            <span style={{ float: 'right' }}>
              <IconClickable Icon={AddCircleIcon} style={{ fill: '#30a8e7' }} onClick={() => window.alert('add one')} />
            </span>
          </Typography>
        </div>
      </Grid>
      <Grid item style={{ height: '70vh' }}>
        <Scrollable maxHeight='100%' style={{minHeight: '100%', overflowX: 'hidden'}}>
          <RemindersCard notes={reminders} setVisitArr={setReminders} />
        </Scrollable>
      </Grid>
    </Grid>
  )
}

export default Reminders
