import { useEffect, useState } from 'react'
import { notesServices } from 'services/notes/NotesService'

const useNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    notesServices.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (note) => {
    notesServices.add(note)
      .then(response => {
        setNotes(prevNotes => prevNotes.concat(note))
      })
      .catch(error => console.error(error))
  }

  return {
    notes,
    addNote
  }
}

export default useNotes
