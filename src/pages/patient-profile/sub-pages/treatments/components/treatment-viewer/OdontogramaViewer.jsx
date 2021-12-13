/* eslint-disable */
import { Divider, Grid } from '@material-ui/core'
import ToothArchesViewer from 'pages/patient-profile/sub-pages/treatments/components/treatment-viewer/tooth-arches-viewer/ToothArchesViewer'
import React, { useEffect, useState } from 'react'

const OdontogramaViewer = ({ treatment }) => {
  const [toothsSelected, setToothsSelected] = useState([])

  useEffect(() => {
    treatment.processes.forEach(p => {
      const pieces = p.pieces.split(', ')
      const formatted = pieces.map(piece => `tooth-${piece}-parent`)
      setToothsSelected(prev => [...prev, ...formatted])
    })
  }, [treatment])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs>
            <span>Odontograma</span>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignContent='center' justify='center'>
          <Grid item>
            <ToothArchesViewer
              type={treatment.typeOdontograma}
              toothsSelected={toothsSelected}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OdontogramaViewer
