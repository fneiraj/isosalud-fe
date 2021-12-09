import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const DeleteNoteDialog = ({ visible, toggleVisible, confirmDelete }) => {
  return (
    <Dialog
      open={visible}
      onClose={toggleVisible}
    >
      <DialogTitle>
        Eliminar nota
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estas seguro de eliminar esta nota?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleVisible} color='primary' variant='contained'>
          Cancelar
        </Button>
        <Button onClick={confirmDelete} color='secondary' variant='contained'>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteNoteDialog
