/* eslint-disable */
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PatientFormAddNote from 'pages/patient-profile/components/PatientFormAddNote'
import useToggle from 'hooks/useToggle'
import { notesService } from 'services/notes/NotesService'
import { useToasts } from 'react-toast-notifications'
import dateUtils from 'utils/date-fns-utils'
import DeleteNoteDialog from 'pages/patient-profile/components/PatientNoteDeleteDialog'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.spacing(10)
  },
  bold: {
    fontWeight: 500
  },
  right: {
    float: 'right'
  },
  smallFont: {
    fontWeight: 230,
    fontSize: 14
  },
  noteItem: {
    '&:hover': {
      background: '#E5E5E5',
      cursor: 'pointer'
    }
  },
  comment: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    wordBreak: 'break-all',
    overflow: 'hidden',
    width: '10rem'
  }
}))

const PatientInfo = ({ currentUserId, notes, setNotes, handleShowAllNotes }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [isFormAddNewVisible, toggleFormAddNewVisible] = useToggle()
  const [isDeleteDialogVisible, toggleDeleteDialogVisible] = useToggle()
  const [currentNote, setCurrentNote] = useState(undefined)

  const handleClickNote = (note) => {
    setCurrentNote(note)
    toggleFormAddNewVisible()
  }

  const renderNote = (note) => {
    const dateParsed = dateUtils.parse(note?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
    const dateFormatted = dateUtils.isValid(dateParsed) ? dateUtils.format(dateParsed, 'dd-MM-yyyy') : ''

    return (
      <Typography key={note?.id} component='div' className={classes.noteItem} onClick={() => handleClickNote(note)}>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.comment}>{note?.comment}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{`${note?.author?.personInfo?.firstName} ${note?.author?.personInfo?.lastName}`}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.smallFont}>{dateFormatted}</Typography>
          </Grid>
        </Grid>
      </Typography>
    )
  }

  const Notes = () => (
    <Grid container>
      {notes.map(note => (
        <Grid item xs={12} key={note.id}>
          {renderNote(note)}
        </Grid>
      ))}
    </Grid>
  )

  const EmptyState = () => (
    <Grid container>
      <>Sin registros</>
    </Grid>
  )

  const handleAddNote = () => {
    toggleFormAddNewVisible()
  }

  const onCreateCallback = (note) => {
    notesService.create(
      {
        noteType: 'Nota',
        userTargetId: currentUserId,
        ...note
      })
      .then(response => {
        addToast('Nota agregada correctamente', { appearance: 'success' })
        setNotes(prev => [...prev, response.data])
      })
      .catch(error => {
        console.error(error)
        addToast('Error al agregar nota', { appearance: 'error' })
      })

    toggleFormAddNewVisible()
  }

  const onUpdateCallback = (note) => {
    notesService.update(note)
      .then(response => {
        addToast('Nota agregada correctamente', { appearance: 'success' })
        setNotes(prev => [...prev.filter(n => n.id !== note.id), response.data])
      })
      .catch(error => {
        console.error(error)
        addToast('Error al agregar nota', { appearance: 'error' })
      })

    toggleFormAddNewVisible()
  }

  const onDeleteCallback = () => {
    toggleFormAddNewVisible()
    toggleDeleteDialogVisible()
  }

  const handleConfirmDelete = () => {
    notesService.remove(currentNote.id)
      .then(response => {
        if (response.data.message === 'OK') {
          addToast('Nota eliminada correctamente', { appearance: 'success' })
          setNotes(prev => [...prev.filter(n => n.id !== currentNote.id)])
        } else {
          addToast('Error al eliminar nota', { appearance: 'error' })
        }
      })
      .catch(error => {
        console.error(error)
        addToast('Error al eliminar nota', { appearance: 'error' })
      })
    setCurrentNote(undefined)
    toggleDeleteDialogVisible()
  }

  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            Notas
            <Button color='primary' onClick={handleAddNote} className={classes.right}>
              Agregar
            </Button>
          </Typography>
          {notes && notes.length > 0 ? <Notes /> : <EmptyState />}
          {/*<Button color='primary' onClick={handleShowAllNotes} className={classes.right}>
            Ver todas
          </Button>*/}
        </CardContent>
      </Card>
      <PatientFormAddNote
        key={'form-new-note-' + isFormAddNewVisible}
        visible={isFormAddNewVisible}
        toggleVisible={toggleFormAddNewVisible}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onCreateCallback={onCreateCallback}
        onUpdateCallback={onUpdateCallback}
        onDeleteCallback={onDeleteCallback}
      />
      <DeleteNoteDialog
        visible={isDeleteDialogVisible}
        toggleVisible={toggleDeleteDialogVisible}
        confirmDelete={handleConfirmDelete}
      />
    </>
  )
}

export default PatientInfo
