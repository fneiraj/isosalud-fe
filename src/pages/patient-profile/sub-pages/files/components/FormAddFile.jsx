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

const FormAddFile = ({
  classes,
  visible,
  toggleVisible,
  onUploadCallback
}) => {
  // eslint-disable-next-line no-unused-vars
  const [filesSelected, setFilesSelected] = useState([])
  const [collectionName, setCollectionName] = useState('')
  const [errorMsg, setErrorMsg] = useState(undefined)

  const onDrop = useCallback(acceptedFiles => {
    console.log({ acceptedFiles })
    acceptedFiles.forEach(file => setFilesSelected(prev => [...prev, file]))
  }, [])

  const DragAndDrop = () => {
    const { getRootProps, getInputProps } = useDropzone({ getFilesFromEvent: event => myCustomFileGetter(event), onDrop })

    return (
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })} className={classes.dropzone}>
          <input {...getInputProps()} />
          <p>Arrastra los archivos aquí o haz click para seleccionar archivos.</p>
        </div>
        <aside>
          {filesSelected.length > 0 &&
            <>
              <h4>Archivos</h4>
              <ul>{filesSelected.map(f => <li key={f.name}>{f.name}</li>)}</ul>
            </>}
        </aside>
      </section>
    )
  }

  async function myCustomFileGetter (event) {
    const files = []
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i)

      Object.defineProperty(file, 'myProp', {
        value: true
      })

      files.push(file)
    }

    return files
  }

  const handleSubmit = () => {
    if ((collectionName !== undefined && collectionName !== '') && (filesSelected !== undefined && filesSelected.length > 0)) {
      onUploadCallback(filesSelected, collectionName)
    } else if (!(filesSelected !== undefined && filesSelected.length > 0)) {
      setErrorMsg('Debes seleccionar al menos un archivo para enviar')
    } else {
      setErrorMsg('Debes ingresar un nombre para la colección de archivos.')
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
              Subir archivos
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
                label='Titulo de coleccion de archivos'
                fullWidth
                value={collectionName}
                onChange={(e) => {
                  setErrorMsg(undefined)
                  setCollectionName(e.target.value)
                }}
              />
            </div>

            <div style={{ width: '100%', height: '100%', marginTop: '5%' }}>
              <DragAndDrop />
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
                Subir
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  )
}

export default withStyles(styles)(FormAddFile)
