import { useEffect, useState } from 'react'
import { Button, IconButton, Modal, Paper, Step, StepLabel, Stepper, withStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import styles from './styles'
import { PatientInfo, ConfirmationForm, PersonalInfoForm } from './form'
import { userService } from 'services/user/UserService'

const FormNewTreatment = ({
  classes,
  visible,
  toggleVisible,
  cancelAppointment,
  currentTreatmentEditing = {},
  commitChanges,
  setCurrentTreatmentEditing,
  patient
}) => {
  const [changes, setChanges] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [isNextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [messageError, setMessageError] = useState(undefined)
  const [isNew, setIsNew] = useState()
  const [flagDataPassed, setFlagDataPassed] = useState(false)

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setNextBtnEnabled(true)
    }
  }, [activeStep])

  useEffect(() => {
    if (currentTreatmentEditing.id !== undefined) {
      if (!flagDataPassed) {
        setChanges(currentTreatmentEditing)
        setFlagDataPassed(true)
      }
      setNextBtnEnabled(true)
    }
  }, [currentTreatmentEditing, activeStep])

  useEffect(() => {
    setIsNew(currentTreatmentEditing.id === undefined)
  }, [])

  const change = ({ field, changes }) => {
    setChanges((prev) => {
      const next = {
        ...prev,
        [field]: changes
      }
      handleTextEditorOnChange(next, field, changes)
      return next
    })
  }

  const commit = (type) => {
    const merge = {
      ...currentTreatmentEditing,
      ...changes
    }
    if (type === 'cancel') {
      commitChanges({ [type]: merge.id })
    } else if (type === 'changed') {
      commitChanges({ [type]: merge })
    } else {
      commitChanges({ [type]: { ...merge } })
    }

    setChanges({})
  }

  const displayData = {
    ...currentTreatmentEditing,
    ...changes
  }

  const applyChanges = isNew
    ? () => commit('added')
    : () => commit('changed')

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
        if (isNew) {
          userService.validate({ rut: prev.rut, firstName: prev.firstName, lastName: prev.lastName })
            .then(response => {
              if (response.data.statusCode === 'OK') {
                setMessageError(undefined)
              } else {
                setNextBtnEnabled(false)
                setMessageError('Error: ' + response.data.errorMsg)
              }
            })
        }
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
      change({
        field: [field], changes: change.value
      })
    },
    value: displayData[field] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField
  })

  const pickerEditorProps = field => ({
    className: classes.picker,
    // keyboard: true,
    ampm: false,
    value: displayData[field],
    onChange: date => change({
      field: [field], changes: date || new Date(displayData[field])
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
      //      change({ field: [field], changes: date || new Date(displayData[field]) })
      //      change({ field: ['endDate'], changes: newEndDate })

      change({ field: [field], changes: date || new Date(displayData[field]) })
    }
  })

  const cancelChanges = () => {
    setChanges({})
    setCurrentTreatmentEditing(undefined)
    toggleVisible()
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
      stepName: 'Primero',
      component: <PatientInfo
        classes={classes}
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayData}
        setNextBtnEnabled={setNextBtnEnabled}
        change={change}
        messageError={messageError}
        isEditing={!isNew}
        patient={patient}
                 />
    },
    {
      stepName: 'Segundo',
      component: <PersonalInfoForm
        classes={classes}
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayData}
        changeAppointment={change}
        setNextBtnEnabled={setNextBtnEnabled}
        isEditing={!isNew}
                 />
    },
    {
      stepName: 'Tercero',
      component: <ConfirmationForm
        textEditorProps={textEditorProps}
        pickerEditorProps={pickerEditorProps}
        pickerEditorPropsStartDate={pickerEditorPropsStartDate}
        displayAppointmentData={displayData}
        setNextBtnEnabled={setNextBtnEnabled}
        messageError={messageError}
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

  return (
    <Modal
      open={visible}
      onClose={cancelChanges}
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

          <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
            <BackOrCloseButton />
            <Button
              key={'nextBtn' + activeStep}
              variant='contained'
              color='primary'
              disabled={!isNextBtnEnabled}
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  toggleVisible()
                  applyChanges()
                } else {
                  handleNext()
                  setNextBtnEnabled(false)
                }
              }}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? (isNew ? 'Confirmar y guardar' : 'Guardar') : 'Siguiente'}
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  )
}

export default withStyles(styles)(FormNewTreatment)
