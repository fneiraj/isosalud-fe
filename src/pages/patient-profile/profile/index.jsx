import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Grid, Paper } from '@material-ui/core'
import PatientInfo from './components/PatientInfo'
import PatientNotes from './components/PatientNotes'
import PatientAppointments from './components/PatientAppointments'
import { withStyles } from '@material-ui/core/styles'
import Payments from './components/Payments'
import { patientService } from 'services/patient/PatientService'

const PatienteProfilePage = (props) => {
  const { classes, match } = props
  // TODO: Refactorizar esto
  // eslint-disable-next-line no-unused-vars
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    patientService.getById(match.params.id)
      .then(response => {
        setUserData(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <Paper className={classes.root} key={userData.id}>
      <Grid container justify='flex-start' spacing={3}>
        <Grid key='patient_info' item xs={12} sm={7}>
          <PatientInfo
            isEditing={isEditing}
            userData={userData}
          />
        </Grid>
        <Grid key='patient_notes' item xs={12} sm={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PatientNotes />
            </Grid>
            <Grid item xs={12}>
              <Payments />
            </Grid>
          </Grid>
        </Grid>
        <Grid key='patient_appointments' item xs={12}>
          <PatientAppointments
            userData={userData}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(PatienteProfilePage)
