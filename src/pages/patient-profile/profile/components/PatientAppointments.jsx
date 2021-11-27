import { Button, Card, CardContent, Divider, Grid, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import EventIcon from '@material-ui/icons/Event'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import DescriptionIcon from '@material-ui/icons/Description'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded'
import DateFnsAdapter from '@date-io/date-fns'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab'
import classNames from 'classnames'
import Scrollable from '../../../../components/scrollable'
import { appointmentService } from 'services/appointment/AppointmentService'
import NewAppointmentForm from 'forms/appointment/new'
import useToggle from 'hooks/useToggle'

const dateFns = new DateFnsAdapter()

const useStyles = makeStyles(() => ({
  leftSide: {
    // TODO: adjust this value accordingly
    flex: 0
  },
  bold: {
    fontWeight: 400
  },
  date: {
    fontSize: '17px'
  },
  fontWeight200: {
    fontWeight: 250
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  addAppointmentButtonBox: {
    float: 'right'
  },
  scrollable: {
    maxHeight: '270px',
    width: '100%',
    overflow: 'auto'
  }
}))

const PatientAppointments = ({ handleAddNote, userData }) => {
  const classes = useStyles()
  const [appointments, setAppointments] = useState([])
  const [isFormVisible, toggleFormVisible] = useToggle(false)

  useEffect(() => {
    if (userData?.personInfo?.rut) {
      appointmentService.getAllByPatientRut(userData?.personInfo?.rut)
        .then(response => setAppointments(response.data))
        .catch(error => console.error(error))
    }
  }, [userData])

  const Title = () => (
    <Typography className={classes.title} color='textSecondary' gutterBottom>
      Citas
      <div className={classes.addAppointmentButtonBox}>
        <Button
          color='primary'
          endIcon={<EventIcon />}
          onClick={toggleFormVisible}
        >
          Agregar cita
        </Button>
      </div>
    </Typography>
  )

  const renderTimelineItem = ({ id, title, startDate: date, medic, status, type }, isLast) => {
    const dateFormated = dateFns.parse(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX')

    let statusIcon

    switch (status.name) {
      case 'Cancelada':
        statusIcon = <HighlightOffIcon fontSize='large' style={{ fill: '#ef5350' }} />
        break
      case 'Realizada':
        statusIcon = <CheckCircleOutlineIcon fontSize='large' style={{ fill: '#66bb6a' }} />
        break
      case 'Reagendada':
        statusIcon = <ScheduleRoundedIcon fontSize='large' style={{ fill: '#ffa726' }} />
        break
      default:
        statusIcon = <PlayCircleFilledWhiteOutlinedIcon fontSize='large' style={{ fill: '#64B5F6' }} />
    }

    return (
      <TimelineItem>
        <TimelineOppositeContent className={classes.leftSide} />
        <TimelineSeparator>
          {statusIcon}
          {!isLast && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Card variant='outlined'>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography align='center'>
                    <span
                      className={classNames(classes.bold, classes.date)}
                    >{dateFns.format(dateFormated, 'dd \'de\' MMMM \'de\' y')}
                    </span><br />
                    <span
                      className={classes.fontWeight200}
                    >{dateFns.format(dateFormated, 'hh:mm a').toUpperCase()}
                    </span>
                  </Typography>
                </Grid>
                <Hidden mdDown>
                  <Divider
                    orientation='vertical' flexItem
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                  />
                </Hidden>
                <Grid item xs={12} md={2}>
                  <Typography align='center'>
                    <span className={classes.fontWeight200}>Tipo</span><br />
                    <span className={classes.bold}>{type.name}</span>
                  </Typography>
                </Grid>
                <Hidden mdDown>
                  <Divider
                    orientation='vertical' flexItem
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                  />
                </Hidden>
                <Grid item xs={12} md={3}>
                  <Typography align='center'>
                    <span className={classes.fontWeight200}>Doctor</span><br />
                    <span className={classes.bold}>{`${medic.firstName} ${medic.lastName}`}</span>
                  </Typography>
                </Grid>
                <Hidden mdDown>
                  <Divider
                    orientation='vertical' flexItem
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                  />
                </Hidden>
                <Grid item xs={12} md={3} className={classes.button}>
                  <Button
                    variant='text'
                    color='primary'
                    startIcon={<DescriptionIcon />}
                  >
                    Comentarios
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TimelineContent>
      </TimelineItem>
    )
  }

  const AppointmentsTimeline = () => {
    appointments?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

    return (
      <Timeline>
        {appointments?.map((item, i) => (
          renderTimelineItem(item, appointments.length === i + 1)
        ))}
      </Timeline>
    )
  }

  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <Title />
          <Scrollable>
            <AppointmentsTimeline />
          </Scrollable>
        </CardContent>
      </Card>
      <NewAppointmentForm
        visible={isFormVisible}
        visibleChange={toggleFormVisible}
        currentPatientData={userData}
      />
    </>
  )
}

export default PatientAppointments
