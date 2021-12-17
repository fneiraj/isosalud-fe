/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Grid, Paper } from '@material-ui/core'
import PatientInfo from './components/PatientInfo'
import PatientNotes from './components/PatientNotes'
import { withStyles } from '@material-ui/core/styles'
import Payments from './components/Payments'
import { patientService } from 'services/patient/PatientService'
import PatientInfo2 from './components/PatientInfo2'

const UserProfilePage = (props) => {
  const { classes, match } = props
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
        <Grid key='patient_info2' item xs={12} sm={12}>
          <PatientInfo2
            isEditing={isEditing}
            userData={userData}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(UserProfilePage)
