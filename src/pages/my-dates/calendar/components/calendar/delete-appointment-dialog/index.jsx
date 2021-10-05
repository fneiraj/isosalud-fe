import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const DeleteAppoinmentDialog = ({ confirmationVisible, toggleConfirmationVisible, commitDeletedAppointment }) => {
  return (
    <Dialog
      open={confirmationVisible}
      onClose={toggleConfirmationVisible}
    >
      <DialogTitle>
        Borrar cita
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estas seguro de borrar esta cita?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleConfirmationVisible} color='primary' variant='outlined'>
          Cancelar
        </Button>
        <Button onClick={commitDeletedAppointment} color='secondary' variant='outlined'>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAppoinmentDialog
