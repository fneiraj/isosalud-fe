import { Button, Card, CardContent, Divider, Grid, Hidden, Modal, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import EventIcon from '@material-ui/icons/Event'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import DescriptionIcon from '@material-ui/icons/Description'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab'
import classNames from 'classnames'
import Scrollable from 'components/scrollable'
import { appointmentService } from 'services/appointment/AppointmentService'
import NewAppointmentForm from 'forms/appointment/new'
import useToggle from 'hooks/useToggle'
import { useToasts } from 'react-toast-notifications'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import { Close } from '@material-ui/icons'
import dateUtils from 'utils/date-fns-utils'

const useStyles = makeStyles((theme) => ({
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
  },
  modal: {
    marginTop: 250,
    marginBottom: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    width: '30%'
  },
  content: {
    padding: theme.spacing(1, 3, 2),
    width: '100%',
    height: '100%'
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  }
}))

const PatientAppointments = ({ userData }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [appointments, setAppointments] = useState([])
  const [isFormVisible, toggleFormVisible] = useToggle(false)
  const [isCommentsModalVisible, toggleCommentsModalVisible] = useToggle()
  const [currentComments, setCurrentComment] = useState(undefined)

  useEffect(() => {
    if (userData?.personInfo?.rut) {
      appointmentService.getAllByPatientRut(userData?.personInfo?.rut)
        .then(response => setAppointments(response.data))
        .catch(error => console.error(error))
    }
  }, [userData])

  const commitChanges = ({ added }) => {
    if (added) {
      const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0
      appointmentService.add(added)
        .then(response => {
          setAppointments([...appointments, { id: startingAddedId, ...response.data }])
          addToast('Cita agendada correctamente', { appearance: 'success', autoDismiss: true })
        })
        .catch(error => {
          console.error(error)
          addToast('Error al agregar cita', { appearance: 'error', autoDismiss: true })
        })
    }

    return { appointments, addedAppointment: {} }
  }

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

  const renderTimelineItem = ({ id, title, startDate: date, medic, status, type, comment }, isLast) => {
    const dateFormated = dateUtils.parse(date, 'yyyy-MM-dd HH:mm')

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
                    >{dateUtils.format(dateFormated, 'dd \'de\' MMMM \'del\' yyyy')}
                    </span><br />
                    <span
                      className={classes.fontWeight200}
                    >{dateUtils.format(dateFormated, 'hh:mm').toUpperCase()}
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
                    <span className={classes.bold}>{`${medic.personInfo?.firstName} ${medic.personInfo?.lastName}`}</span>
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
                    onClick={() => {
                      setCurrentComment(comment)
                      toggleCommentsModalVisible()
                    }}
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

  const ModalComments = ({ visible, toggleVisible }) => {
    const handleClose = () => {
      toggleVisible()
      setCurrentComment(undefined)
    }

    return (
      <Modal
        open={visible}
        onClose={handleClose}
        className={classes.modal}
      >
        <Paper className={classes.content}>
          <div className={classes.header}>
            <Typography variant='h5'>
              Comentario
              <IconButton
                className={classes.closeButton}
                onClick={handleClose}
              >
                <Close color='action' />
              </IconButton>
            </Typography>

          </div>
          <div>
            <div style={{ width: '75%', height: '75%', alignItems: 'center' }}>
              <>
                {currentComments}
              </>
            </div>

            <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleClose}
                className={classes.button}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
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
        key={`form-new-appointment-${isFormVisible}`}
        commitChanges={commitChanges}
        visible={isFormVisible}
        visibleChange={toggleFormVisible}
        currentPatientData={userData}
      />
      <ModalComments
        key={`modal-comments-${isCommentsModalVisible}`}
        visible={isCommentsModalVisible}
        toggleVisible={toggleCommentsModalVisible}
      />
    </>
  )
}

export default PatientAppointments
