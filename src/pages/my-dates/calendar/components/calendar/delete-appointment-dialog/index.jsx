import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const DeleteAppoinmentDialog = ({ confirmationVisible, toggleConfirmationVisible, commitDeletedAppointment }) => {
  return (
    <Dialog
      open={confirmationVisible}
      onClose={toggleConfirmationVisible}
    >
      <DialogTitle>
        Cancelar cita
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estas seguro de cancelar esta cita?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleConfirmationVisible} color='primary' variant='contained'>
          Volver
        </Button>
        <Button onClick={commitDeletedAppointment} color='secondary' variant='contained'>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAppoinmentDialog
