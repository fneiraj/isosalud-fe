import { Button, Card, CardContent, Divider, Grid, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import EventIcon from '@material-ui/icons/Event'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import DescriptionIcon from '@material-ui/icons/Description'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
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

const PatientAppointments = ({ handleAddNote }) => {
  const classes = useStyles()

  const Title = () => (
    <Typography className={classes.title} color='textSecondary' gutterBottom>
      Citas
      <div className={classes.addAppointmentButtonBox}>
        <Button
          color='primary'
          endIcon={<EventIcon />}
        >
          Agregar cita
        </Button>
      </div>
    </Typography>
  )

  const appointments = [
    {
      id: 1,
      title: 'Cita 1',
      date: dateFns.parse('10-09-2021 11:44', 'dd-MM-yyyy hh:mm'),
      dr: 'Fernando Neira',
      status: 'complete'
    },
    {
      id: 2,
      title: 'Cita 2',
      date: dateFns.parse('15-09-2021 11:44', 'dd-MM-yyyy hh:mm'),
      dr: 'Fernando Neira',
      status: 'complete'
    },
    {
      id: 3,
      title: 'Cita 3',
      date: dateFns.parse('14-09-2021 11:44', 'dd-MM-yyyy hh:mm'),
      dr: 'Fernando Neira',
      status: 'miss'
    },
    {
      id: 4,
      title: 'Cita 1',
      date: dateFns.parse('30-09-2021 11:44', 'dd-MM-yyyy hh:mm'),
      dr: 'Fernando Neira',
      status: 'scheduled'
    }
  ]

  const renderTimelineItem = ({ id, title, date, dr, status }, isLast) => {
    let statusIcon

    switch (status) {
      case 'miss':
        statusIcon = <HighlightOffIcon fontSize='large' style={{ fill: 'red' }} />
        break
      case 'complete':
        statusIcon = <CheckCircleOutlineIcon fontSize='large' style={{ fill: 'green' }} />
        break
      default:
        statusIcon = <PlayCircleFilledWhiteOutlinedIcon fontSize='large' />
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
                    >{dateFns.format(date, 'dd \'de\' MMMM \'de\' y')}
                    </span><br />
                    <span
                      className={classes.fontWeight200}
                    >{dateFns.format(date, 'hh:mm a').toUpperCase()}
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
                    <span className={classes.bold}>Consulta</span>
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
                    <span className={classes.bold}>{dr}</span>
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
                    Notas
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
    appointments.sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
      <Timeline>
        {appointments.map((item, i) => (
          renderTimelineItem(item, appointments.length === i + 1)
        ))}
      </Timeline>
    )
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Title />
        <Scrollable>
          <AppointmentsTimeline />
        </Scrollable>
      </CardContent>
    </Card>
  )
}

export default PatientAppointments
