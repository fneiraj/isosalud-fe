import { useEffect, useState } from 'react'
import { Button, IconButton, Modal, Paper, Step, StepLabel, Stepper, withStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import styles from './styles'
import { boxService } from 'services/box/BoxService'
import { patientService } from 'services/patient/PatientService'
import { appointmentTypesService } from 'services/appointment-types/AppointmentTypesService'
import { AppointmentInfoForm, ConfirmationForm, PatientInfoForm } from 'forms/appointment/new/form'

const NewAppointmentForm = (props) => {
  const {
    classes,
    visible,
    visibleChange,
    cancelAppointment,
    appointmentData = {},
    commitChanges,
    currentPatientData
  } = props

  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [boxes, setBoxes] = useState([])
  const [patients, setPatients] = useState([])
  const [appointmentTypes, setAppointmentTypes] = useState([])
  const [isNextBtnEnabled, setNextBtnEnabled] = useState(false)

  useEffect(() => {
    boxService.getAll()
      .then(response => setBoxes(response.data.data))
      .catch(error => console.error(error))

    patientService.getAll()
      .then(response => setPatients(response.data.data))
      .catch(error => console.error(error))

    appointmentTypesService.getAll()
      .then(response => setAppointmentTypes(response.data.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setNextBtnEnabled(true)
    }
  }, [activeStep])

  useEffect(() => {
    if (appointmentData.id !== undefined) {
      setNextBtnEnabled(true)
    }
  }, [appointmentData, activeStep])

  const changeAppointment = ({ field, changes }) => {
    setAppointmentChanges((prev) => {
      const next = {
        ...prev,
        [field]: changes
      }
      handleTextEditorOnChange(next, field, changes)
      return next
    })
  }

  const changeAppointments = ({ f1, c1 }, { f2, c2 }) => {
    const nextChanges = {
      ...appointmentChanges,
      [f1]: c1,
      [f2]: c2
    }

    setAppointmentChanges(nextChanges)
    handleTextEditorOnChange(f1, c1)
    handleTextEditorOnChange(f2, c2)
  }

  const commitAppointment = (type) => {
    const appointment = {
      ...appointmentData,
      ...appointmentChanges
    }

    if (type === 'cancel') {
      commitChanges({ [type]: appointment.id })
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } })
    } else {
      commitChanges({ [type]: appointment })
    }

    setAppointmentChanges({})
  }

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges
  }

  const isNewAppointment = appointmentData.id === undefined
  const applyChanges = isNewAppointment
    ? () => commitAppointment('added')
    : () => commitAppointment('changed')

  const checkFieldAndValue = (prev, fieldWanted, actualField, value) => {
    return (
      String(actualField) === fieldWanted ? (value !== null && value !== undefined && value !== '') : (prev[fieldWanted] !== undefined && prev[fieldWanted] !== '')
    )
  }

  const handleTextEditorOnChange = (prev, field, value) => {
    if (activeStep === 0) {
      const isTitleOk = checkFieldAndValue(prev, 'title', field, value)
      const isBoxOk = checkFieldAndValue(prev, 'box', field, value)
      const isCommentOk = checkFieldAndValue(prev, 'comment', field, value)
      const isAppointmentTypeOk = checkFieldAndValue(prev, 'type', field, value)

      if (!isTitleOk || !isBoxOk || !isCommentOk || !isAppointmentTypeOk) {
        setNextBtnEnabled(false)
        return
      }
    } else if (activeStep === 1) {
      const isPatientSelectedOk = String(field) === 'patient' && (value !== undefined)

      if (!isPatientSelectedOk) {
        setNextBtnEnabled(false)
        return
      }
    }

    setNextBtnEnabled(true)
  }

  const textEditorProps = field => ({
    variant: 'outlined',
    onChange: ({ target: change }) => {
      changeAppointment({
        field: [field], changes: change.value
      })
    },
    value: displayAppointmentData[field] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField
  })

  const getMinDate = () => {
    if (isNewAppointment) return { minDate: new Date() }

    return {}
  }

  const pickerEditorProps = field => ({
    className: classes.picker,
    // keyboard: true,
    ampm: false,
    value: displayAppointmentData[field],
    onChange: date => changeAppointment({
      field: [field], changes: date || new Date(displayAppointmentData[field])
    }),
    ...getMinDate(),
    inputVariant: 'outlined',
    format: 'dd/MM/yyyy',
    onError: () => null
  })

  const pickerEditorPropsStartDate = field => ({
    ...pickerEditorProps(field),
    onChange: date => {
      const newEndDate = isNewAppointment ? date : displayAppointmentData.endDate

      if (!isNewAppointment) {
        newEndDate.setFullYear(date.getFullYear())
        newEndDate.setDate(date.getDate())
        newEndDate.setMonth(date.getMonth())
      }

      //      changeAppointment({ field: [field], changes: date || new Date(displayAppointmentData[field]) })
      //      changeAppointment({ field: ['endDate'], changes: newEndDate })

      changeAppointments(
        { f1: [field], c1: date || new Date(displayAppointmentData[field]) },
        { f2: ['endDate'], c2: newEndDate }
      )
    }
  })

  const cancelChanges = () => {
    setAppointmentChanges({})
    visibleChange()
    cancelAppointment()
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const steps = [
    {
      stepName: 'Cita',
      component: <AppointmentInfoForm
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayAppointmentData}
        boxes={boxes}
        appointmentTypes={appointmentTypes}
        setNextBtnEnabled={setNextBtnEnabled}
        {...props}
                 />
    },
    {
      stepName: 'Paciente',
      component: <PatientInfoForm
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayAppointmentData}
        changeAppointment={changeAppointment}
        patients={patients}
        setNextBtnEnabled={setNextBtnEnabled}
        currentPatientData={currentPatientData}
        {...props}
                 />
    },
    {
      stepName: 'Confirmación',
      component: <ConfirmationForm
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayAppointmentData}
        setNextBtnEnabled={setNextBtnEnabled}
        {...props}
                 />
    }
  ]

  const CancelButton = () => <Button onClick={cancelChanges}>Cancelar</Button>
  const BackButton = () => (
    <Button
      disabled={activeStep === 0} onClick={handleBack}
      className={classes.button}
    >
      Atras
    </Button>)

  const BackOrCloseButton = () => activeStep === 0 ? <CancelButton /> : <BackButton />

  const isAppointmentCurrentlyCancel = () => {
    console.log(displayAppointmentData)
    return true
  }

  return (
    <Modal
      open={visible}
      onClose={visibleChange}
      className={classes.modal}
    >
      <Paper className={classes.content}>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
          >
            <Close color='action' />
          </IconButton>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {}
              const labelProps = {}
              return (
                <Step key={label.stepName} {...stepProps}>
                  <StepLabel {...labelProps}>{label.stepName}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </div>
        <div>
          <div style={{ width: '100%', height: '100%' }}>
            {steps[activeStep]?.component}
          </div>

          <div style={{ bottom: 30, left: 15, position: 'absolute' }} className={classes.buttonGroup}>
            {!isNewAppointment && displayAppointmentData.status.name !== 'Cancelada' && isAppointmentCurrentlyCancel() && (
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                style={{ float: 'left', left: 1 }}
                onClick={() => {
                  visibleChange()
                  commitAppointment('cancel')
                }}
              >
                Cancelar cita
              </Button>
            )}
          </div>

          <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
            <BackOrCloseButton />
            <Button
              key={'nextBtn' + activeStep}
              variant='contained'
              color='primary'
              disabled={!isNextBtnEnabled}
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  visibleChange()
                  applyChanges()
                } else {
                  handleNext()
                  setNextBtnEnabled(false)
                }
              }}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? (isNewAppointment ? 'Confirmar y guardar' : 'Guardar') : 'Siguiente'}
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  )
}

export default withStyles(styles)(NewAppointmentForm)
