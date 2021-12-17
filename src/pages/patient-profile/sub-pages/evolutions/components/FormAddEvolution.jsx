/* eslint-disable */
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {
  Modal, TextField,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
// eslint-disable-next-line
import Alert from '@material-ui/lab/Alert'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const styles = theme => ({
  root: {
    width: '100%'
    //    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  modal: {
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    width: '50%'
  },
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(1, 3, 2),
    width: '100%',
    height: '100%'
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  errorDiv: {
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh'
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  }
})

const FormAddEvolution = ({
  classes,
  visible,
  toggleVisible,
  onUploadCallback
}) => {
  
  const [collectionName, setCollectionName] = useState('')
  const [errorMsg, setErrorMsg] = useState(undefined)

  const handleSubmit = () => {
    if ((collectionName !== undefined && collectionName !== '')) {
      onUploadCallback(collectionName)
    } else {
      setErrorMsg('Debes ingresar un comentario para la evolución.')
    }
  }

  return (
    <>
      <Modal
        open={visible}
        onClose={toggleVisible}
        className={classes.modal}
      >
        <Paper className={classes.content}>
          <div className={classes.header}>
            <Typography variant='h5'>
              Agregar evolución
              <IconButton
                className={classes.closeButton}
                onClick={toggleVisible}
              >
                <Close color='action' />
              </IconButton>
            </Typography>

          </div>
          <div>
            <div className={classes.errorDiv}>
              {errorMsg && <Alert severity='error'>{errorMsg}</Alert>}
            </div>

            <div>
              <TextField
                label='Evolución'
                fullWidth
                value={collectionName}
                multiline
                minRows={15}
                variant={'outlined'}
                onChange={(e) => {
                  setErrorMsg(undefined)
                  setCollectionName(e.target.value)
                }}
              />
            </div>

            <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
              <Button
                onClick={toggleVisible}
                style={{ right: 30 }}
              >
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                className={classes.button}
              >
                Agregar
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  )
}

export default withStyles(styles)(FormAddEvolution)
