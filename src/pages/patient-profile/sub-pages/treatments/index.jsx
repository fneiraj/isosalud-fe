/* eslint-disable */
import { Button, Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import TreatmentCard from 'pages/patient-profile/sub-pages/treatments/components/TreatmentCard'
import TreatmentDetails from 'pages/patient-profile/sub-pages/treatments/components/treatment-viewer/TreatmentDetails'
import { useEffect, useState } from 'react'
import FormNewTreatment from 'pages/patient-profile/sub-pages/treatments/components/form-new'
import useToggle from 'hooks/useToggle'
import { patientService } from 'services/patient/PatientService'
import { treatmentService } from 'services/treatments/TreatmentService'
import { useToasts } from 'react-toast-notifications'
import EmptyState from '../evolutions/components/EmptyState'

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

const TreatmentPlansPage = ({ classes, match }) => {
  const [isModalDetailsVisible, toggleModalDetails] = useToggle()
  const [isModalNewVisible, toggleModalNew] = useToggle()
  const [treatments, setTreatments] = useState([])
  const [currentTreatmentEditing, setCurrentTreatmentEditing] = useState(undefined)
  const [patient, setPatient] = useState({})
  const [currentTreatment, setCurrentTreatment] = useState(undefined)
  const { addToast } = useToasts()

  useEffect(() => {
    treatmentService.getAllByPatientId(match.params.id)
      .then(response => setTreatments(response.data.data))
      .catch(error => console.error(error))

    patientService.getById(match.params.id)
      .then(response => {
        setPatient(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  const handleCloseModal = () => {
    toggleModalDetails()
    setCurrentTreatment(undefined)
  }

  const handleOpenModal = (treatment) => {
    toggleModalDetails()
    setCurrentTreatment(treatment)
  }

  const commitChanges = ({ added, changed, cancel }) => {
    if (added) {
      treatmentService.add(added)
        .then(response => {
          setTreatments(prev => [...prev, response.data])
          addToast('Tratamiento agregado correctamente', { appearance: 'success', autoDismiss: true })
        })
        .catch(error => {
          console.error(error)
          addToast('Error al agregar tratamiento', { appearance: 'error', autoDismiss: true })
        })
    }
    if (changed) {
      treatmentService.edit(changed)
        .then(response => {
          setTreatments(prev => [...prev.filter(u => u.id !== response.data.id), response.data])
          addToast('Tratamiento editado correctamente', { appearance: 'success', autoDismiss: true })
        })
        .catch(error => {
          console.error(error)
          addToast('Error al editar tratamienot', { appearance: 'error', autoDismiss: true })
        })

      setCurrentTreatmentEditing(undefined)
    }
    if (cancel !== undefined) {
      // setDeletedAppointmentId(cancel)
      // toggleDeleteDialogVisible()
    }
    return { treatments, addedAppointment: {} }
  }

  treatments?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Grid container justify='flex-end'>
            <Grid key='addEvolution' item>
              <Button
                onClick={toggleModalNew}
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
            {treatments && treatments.length > 0 ? treatments.map((treatment) => (
              <Grid key={treatment.id} item xs={12}>
                <TreatmentCard handleOpenDetails={() => handleOpenModal(treatment)} key={treatment.id} treatment={treatment} />
              </Grid>
            )) : <EmptyState />}
          </Grid>
        </div>
      </Paper>
      <TreatmentDetails
        key={`treatment-details-${isModalDetailsVisible}`}
        open={isModalDetailsVisible}
        handleClose={handleCloseModal}
        treatment={currentTreatment}
      />
      <FormNewTreatment
        key={`form-new-treatment-${isModalNewVisible}`}
        visible={isModalNewVisible}
        toggleVisible={toggleModalNew}
        currentTreatmentEditing={currentTreatmentEditing}
        setCurrentTreatmentEditing={setCurrentTreatmentEditing}
        patient={patient}
        commitChanges={commitChanges}
      />
    </>
  )
}

export default withStyles(styles)(TreatmentPlansPage)
