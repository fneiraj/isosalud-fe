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
import FormAddNote from '../FormAddNote'
import useToggle from 'hooks/useToggle'
import { useToasts } from 'react-toast-notifications'
import dateFnsInstance from 'utils/date-fns-utils'
import { parseISO } from 'date-fns'

const Reminders = () => {
  const [reminders, setReminders] = useState([])
  const [isFormNewVisible, toggleFormVisible] = useToggle()
  const { addToast } = useToasts()

  useEffect(() => {
    notesService.getAll()
    .then(response => {
      const sorted = response.data.data?.sort((a, b) => {
        const dateCreatedParsedA = parseISO(a.dateCreated)
        const dateCreatedParsedB = parseISO(b.dateCreated)
  
        console.log({dateCreatedParsedA, dateCreatedParsedB})
  
        return dateCreatedParsedB - dateCreatedParsedA
      })

      setReminders(sorted)
    })
    .catch(error => console.error(error))
  }, [])
  
  const onCreateCallback = (note) => {
    notesService.create(
      {
        noteType: 'Nota',
        userTargetId: undefined,
        ...note
      })
      .then(response => {
        addToast('Nota agregada correctamente', { appearance: 'success' })
        setReminders(prev => [response.data, ...prev])
      })
      .catch(error => {
        console.error(error)
        addToast('Error al agregar nota', { appearance: 'error' })
      })

    toggleFormVisible()
  }

  const onDeleteHandle = (id) => {
    notesService.remove(id)
      .then(response => {
        addToast('Nota eliminada correctamente', { appearance: 'success' })
        setReminders(prev => prev.filter(n => n.id !== id))
      })
      .catch(error => {
        console.error(error)
        addToast('Error al eliminar nota', { appearance: 'error' })
      })
  }

  return (
    <>
      <Grid container spacing={2} component={Paper} variant='outlined' style={{ backgroundColor: 'transparent'}}>
        <Grid item xs={12}>
          <div>
            <Typography>
              <span style={{ fontWeight: 400, fontSize: '25px' }}>Notas</span>
              <span style={{ float: 'right' }}>
                <IconClickable Icon={AddCircleIcon} style={{ fill: '#30a8e7' }} onClick={() => toggleFormVisible()} />
              </span>
            </Typography>
          </div>
        </Grid>
        <Grid item style={{ height: '70vh' }}>
          <Scrollable maxHeight='100%' style={{minHeight: '100%', overflowX: 'hidden'}}>
            <RemindersCard notes={reminders} setVisitArr={setReminders} onDeleteHandle={onDeleteHandle} />
          </Scrollable>
        </Grid>
      </Grid>
      <FormAddNote
        key={'form-new-note-'+isFormNewVisible}
        visible={isFormNewVisible}
        toggleVisible={toggleFormVisible}
        onCreateCallback={onCreateCallback}
      />
    </>
  )
}

export default Reminders
