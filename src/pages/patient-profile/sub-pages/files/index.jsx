import { Button, Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import FileRenderCard from 'pages/patient-profile/sub-pages/files/components/FileRenderCard'
import { useEffect, useState } from 'react'
import { filesService } from 'services/files/FilesService'
import EmptyState from 'pages/patient-profile/sub-pages/files/components/EmptyState'
import FormAddFile from 'pages/patient-profile/sub-pages/files/components/FormAddFile'
import useToggle from 'hooks/useToggle'
import { useToasts } from 'react-toast-notifications'

const styles = {
  root: {
    width: '100%',
    height: '100%'
    //    marginTop: theme.spacing(3)
  },
  tableWrapper: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  }

}

const FilesPage = ({ classes, match }) => {
  const [files, setFiles] = useState([])
  const [isVisibleModalAddFile, toggleVisibleModalAddFile] = useToggle()
  const { addToast } = useToasts()

  useEffect(() => {
    filesService.getByIdPatient(match.params.id)
      .then(response => setFiles(response.data.data))
      .catch(error => console.error(error))
  }, [])

  const renderUserFiles = () => {
    files?.sort((a, b) => new Date(b.date) - new Date(a.date))

    return files
      .map((file) => {
        return (
          <Grid key={file.collectionName} item xs={12}>
            <FileRenderCard key={`${file.collectionName}-files`} {...file} />
          </Grid>
        )
      })
  }

  const handleOnAddButton = () => {
    toggleVisibleModalAddFile()
  }

  const handleSubmitUploadFiles = (files, collectionName) => {
    filesService.upload({
      files: files,
      patientId: match.params.id,
      collectionName: collectionName
    })
      .then(response => {
        setFiles(prev => [...response.data.data, ...prev])
        addToast('Colección de archivos subidos correctamente', { appearance: 'success' })
      })
      .catch(error => {
        console.error(error)
        addToast('Error al subir colección de archivos', { appearance: 'error' })
      })

    toggleVisibleModalAddFile()
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Grid container justify='flex-end'>
            <Grid key='addEvolution' item>
              <Button
                onClick={handleOnAddButton}
                variant='contained'
                color='primary'
                className={classes.button}
                endIcon={<AddIcon />}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid container justify='flex-start' spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
            {
            files && files.length > 0 ? renderUserFiles() : <EmptyState />
          }
          </Grid>
        </div>
      </Paper>
      <FormAddFile
        key={`form-new-files-${isVisibleModalAddFile}`}
        visible={isVisibleModalAddFile}
        toggleVisible={toggleVisibleModalAddFile}
        onUploadCallback={handleSubmitUploadFiles}
      />
    </>
  )
}

export default withStyles(styles)(FilesPage)
