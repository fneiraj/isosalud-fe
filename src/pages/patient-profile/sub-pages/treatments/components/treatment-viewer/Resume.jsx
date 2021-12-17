/* eslint-disable */
import { Divider, Grid } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import React, { useState } from 'react'
import dateFnsUtils from 'utils/date-fns-utils'

const Resume = ({ classes, treatment }) => {
  console.log({ treatment })

  const medicName = `${treatment?.medic?.personInfo?.firstName} ${treatment?.medic?.personInfo?.lastName}`
  const patientConvenio = treatment?.patient?.personInfo?.prevision
  const dateCreatedParsed = dateFnsUtils.parse(treatment?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
  const dateParsed = dateFnsUtils.format(dateCreatedParsed, 'dd-MM-yyyy HH:mm')

  const Appointment = ({data}) => {

    console.log({data})

    const dateParsed = dateFnsUtils.parse(data.startDate, 'yyyy-MM-dd HH:mm')
    const dateFormatted = dateFnsUtils.format(dateParsed, 'dd \'de\' MMMM \'de\' yyyy - HH:mm')

    const medicName = `${data.medic?.personInfo?.firstName} ${data.medic?.personInfo?.lastName}`

    return (
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
        >
          <ArrowRightIcon />
          <span>Cita #03</span>
        </div>
        <div style={{ marginLeft: 25 }}>
          <span>{dateFormatted}</span>
          <br />
          <span>{medicName}</span>
        </div>
      </Grid>
    )
  }

  const AppointmentEmpty = () => {
    return (
      <Grid item xs={12}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
        >
          <ArrowRightIcon />
          <span>Sin registros</span>
        </div>
      </Grid>
    )
  }

  const getPriceTotal = () => {
    const price = treatment?.processes?.map(p => p.price).reduce((a, b) => a + b, 0)
    return price
  }

  const moneyFormatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <span>Plan de tratamiento</span>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container style={{ border: '1px solid grey', padding: 10 }}>
          <Grid item className={classes.itemCentered} xs={12}>
            <span>Costos</span>
          </Grid>
          <Grid item className={classes.itemCentered} xs={12}>
            <span>$629.000</span>
          </Grid>
          <Grid item style={{ marginTop: 15 }} xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <span>Abonado</span>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={3}>
                <span>$0</span>
              </Grid>
              <Grid item xs={5}>
                <span>Pendiente</span>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={3}>
                <span>{moneyFormatter.format(getPriceTotal())}</span>
              </Grid>
              <Grid item xs={6}>
                <span>Total</span>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3}>
                <span>{moneyFormatter.format(getPriceTotal())}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction='column' style={{ marginTop: 15, marginBottom: 15 }}>
          <Grid item xs>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            >
              <ArrowRightIcon />
              <span><b>Medico:</b> {medicName}</span>
            </div>
          </Grid>
          <Grid item xs>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            >
              <ArrowRightIcon />
              <span><b>Convenio:</b> {patientConvenio}</span>
            </div>
          </Grid>
          <Grid item xs>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            >
              <ArrowRightIcon />
              <span><b>Fecha:</b> {dateParsed}</span>
            </div>
          </Grid>
          <Grid item xs>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            >
              <ArrowRightIcon />
              <span><b>Sucursal:</b> Clinica Dental ISOSALUD</span>
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ border: '1px solid grey', padding: 10 }}>
          <Grid item xs={12} style={{ marginBottom: 5 }}>
            <span>Citas realizadas</span>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {treatment.appointments && treatment.appointments.length > 0 ?
                treatment.appointments.map(a => <Appointment data={a} />)
                : <AppointmentEmpty />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Resume
