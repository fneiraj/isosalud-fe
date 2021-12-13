import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import dateUtils from 'utils/date-utils'

const PatientInfo = ({ treatment }) => {
  const patientName = `${treatment?.patient?.personInfo?.firstName} ${treatment?.patient?.personInfo?.lastName}`
  const patientRut = treatment?.patient?.personInfo?.rut
  const patientAge = dateUtils.calculateAge(treatment?.patient?.personInfo?.dateOfBirth, 'yyyy-MM-dd')

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs>
            <span>Datos paciente</span>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <span><b>Nombre:</b> {patientName}</span>
            <br />
            <span><b>RUT:</b> {patientRut}</span>
            <br />
            <span><b>Edad:</b> {patientAge}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PatientInfo
