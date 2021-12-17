/* eslint-disable */
import { Button, Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { useEffect, useState } from 'react'
import useToggle from 'hooks/useToggle'
import { useToasts } from 'react-toast-notifications'
import { evolutionService } from 'services/evolutions/EvolutionsService'
import EvolutionRenderCard from './components/EvolutionRenderCard'
import EmptyState from './components/EmptyState'
import FormAddEvolution from './components/FormAddEvolution'

const styles = {
  root: {
    width: '100%',
    height: '100%'
  },
  tableWrapper: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  }
}

const EvolutionsPage = ({ classes, match }) => {
  const [evolutions, setEvolutions] = useState([])
  const [isVisibleModalAddFile, toggleVisibleModalAddFile] = useToggle()
  const { addToast } = useToasts()

  useEffect(() => {
    evolutionService.getByIdPatient(match.params.id)
      .then(response => setEvolutions(response.data.data))
      .catch(error => console.error(error))
  }, [])

  const handleOnAddButton = () => {
    toggleVisibleModalAddFile()
  }

  const handleSubmitUploadFiles = (evolution) => {
    evolutionService.create({comment: evolution, patientId: match.params.id})
      .then(response => {
        setEvolutions(prev => [response.data, ...prev])
        addToast('Evolución agregada correctamente', { appearance: 'success' })
      })
      .catch(error => {
        console.error(error)
        addToast('Error al agregar evolución', { appearance: 'error' })
      })

    toggleVisibleModalAddFile()
  }

  const renderUserFiles = () => {
    evolutions?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))

    return evolutions
      .map((evolution) => {
        return (
          <Grid key={evolution.id} item xs={12}>
            <EvolutionRenderCard key={`evolution-card-${evolution.id}`} {...evolution} />
          </Grid>
        )
      })
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
              evolutions.length > 0 ? renderUserFiles() : <EmptyState />
            }
          </Grid>
        </div>
      </Paper>
      <FormAddEvolution
        key={`form-new-evolution-${isVisibleModalAddFile}`}
        visible={isVisibleModalAddFile}
        toggleVisible={toggleVisibleModalAddFile}
        onUploadCallback={handleSubmitUploadFiles}
      />
    </>
  )
}

export default withStyles(styles)(EvolutionsPage)
