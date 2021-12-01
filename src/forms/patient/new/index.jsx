import { useEffect, useState } from 'react'
import { Button, IconButton, Modal, Paper, Step, StepLabel, Stepper, withStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import styles from './styles'
import { PersonInfoForm, ConfirmationForm } from './form'
import { userService } from 'services/user/UserService'
import PersonalInfoForm from 'forms/patient/new/form/PersonalInfoForm'

const FormNewUser = (props) => {
  const {
    classes,
    visible,
    toggleVisible: visibleChange,
    cancelAppointment,
    appointmentData = {},
    commitChanges
  } = props

  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [isNextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [rutValidationAndPreloadData, setRutValidationAndPreloadData] = useState({})
  const [messageError, setMessageError] = useState(undefined)

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

  const validateRut = (prev, fieldWanted, actualField, value) => {
    const rutStr = String(actualField) === fieldWanted ? value : prev[fieldWanted]

    return (String(rutStr).length > 7 && String(rutStr).includes('-'))
  }

  const handleTextEditorOnChange = (prev, field, value) => {
    if (activeStep === 0) {
      const isFirstNameOk = checkFieldAndValue(prev, 'firstName', field, value)
      const isLastNameOk = checkFieldAndValue(prev, 'lastName', field, value)
      const isRutOk = checkFieldAndValue(prev, 'rut', field, value) && validateRut(prev, 'rut', field, value)
      const isPhoneOk = checkFieldAndValue(prev, 'phone', field, value)
      const isCellphoneOk = checkFieldAndValue(prev, 'cellphone', field, value)

      if (isFirstNameOk && isLastNameOk && isRutOk) {
        userService.validate({ rut: prev.rut, firstName: prev.firstName, lastName: prev.lastName })
          .then(response => {
            if (response.data.statusCode === 'OK') {
              setMessageError(undefined)
              setRutValidationAndPreloadData(response.data)
            } else {
              setNextBtnEnabled(false)
              setMessageError('Error: ' + response.data.errorMsg)
            }
          })
      }

      const isRoleNameOk = checkFieldAndValue(prev, 'roleName', field, value)
      const isContactMeanNameOk = checkFieldAndValue(prev, 'preferredContactMeanName', field, value)
      const isEmailOk = checkFieldAndValue(prev, 'email', field, value)

      if (!isFirstNameOk || !isLastNameOk || !isRutOk || !isPhoneOk || !isCellphoneOk || !isRoleNameOk || !isContactMeanNameOk || !isEmailOk) {
        setNextBtnEnabled(false)
      } else {
        setNextBtnEnabled(true)
      }
    } else if (activeStep === 1) {
      const isCommuneSelected = checkFieldAndValue(prev, 'commune', field, value)
      const isAddressOk = checkFieldAndValue(prev, 'address', field, value)
      const isGenderOk = checkFieldAndValue(prev, 'gender', field, value)
      const isPrevisionOk = checkFieldAndValue(prev, 'prevision', field, value)

      if (!isCommuneSelected || !isAddressOk || !isGenderOk || !isPrevisionOk) {
        setNextBtnEnabled(false)
      } else {
        setNextBtnEnabled(true)
      }
    }
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

  const pickerEditorProps = field => ({
    className: classes.picker,
    // keyboard: true,
    ampm: false,
    value: displayAppointmentData[field],
    onChange: date => changeAppointment({
      field: [field], changes: date || new Date(displayAppointmentData[field])
    }),
    inputVariant: 'outlined',
    format: 'dd/MM/yyyy',
    onError: () => null,
    variant: 'dialog',
    cancelLabel: 'Cancelar'
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
    if (cancelAppointment !== undefined) {
      cancelAppointment()
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const steps = [
    {
      stepName: 'Persona',
      component: <PersonInfoForm
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayAppointmentData}
        setNextBtnEnabled={setNextBtnEnabled}
        changeAppointment={changeAppointment}
        messageError={messageError}
        preloadData={rutValidationAndPreloadData}
        {...props}
                 />
    },
    {
      stepName: 'Personal',
      component: <PersonalInfoForm
        classes={classes}
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayAppointmentData}
        changeAppointment={changeAppointment}
        setNextBtnEnabled={setNextBtnEnabled}
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
        messageError={messageError}
        preloadData={rutValidationAndPreloadData}
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

export default withStyles(styles)(FormNewUser)
