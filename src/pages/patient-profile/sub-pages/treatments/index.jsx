import { Button, Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import TreatmentCard from 'pages/patient-profile/sub-pages/treatments/components/TreatmentCard'
import TreatmentDetails from 'pages/patient-profile/sub-pages/treatments/components/TreatmentDetails'
import { useEffect, useState } from 'react'
import FormNewTreatment from 'pages/patient-profile/sub-pages/treatments/components/form-new'
import useToggle from 'hooks/useToggle'
import { patientService } from 'services/patient/PatientService'

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

  useEffect(() => {
    setTreatments([])

    patientService.getById(match.params.id)
      .then(response => {
        setPatient(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  const handleCloseModal = () => {
    toggleModalDetails()
  }

  const handleOpenModal = (id) => {
    toggleModalDetails()
  }

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
            {treatments.map((treatment) => (
              <Grid key={treatment.id} item xs={12}>
                <TreatmentCard handleOpenDetails={handleOpenModal} key={treatment.id} {...treatment} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
      <TreatmentDetails
        key={`treatment-details-${isModalDetailsVisible}`}
        open={isModalDetailsVisible}
        handleClose={handleCloseModal}
      />
      <FormNewTreatment
        key={`form-new-treatment-${isModalNewVisible}`}
        visible={isModalNewVisible}
        toggleVisible={toggleModalNew}
        currentTreatmentEditing={currentTreatmentEditing}
        setCurrentTreatmentEditing={setCurrentTreatmentEditing}
        patient={patient}
      />
    </>
  )
}

export default withStyles(styles)(TreatmentPlansPage)
