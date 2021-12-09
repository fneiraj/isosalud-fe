import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import esLocale from 'date-fns/locale/es/'
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import DateFnsUtils from '@date-io/date-fns'
import { previsionService } from 'services/prevision/PrevisionService'

const PatientInfo = ({
  classes,
  textEditorProps,
  pickerEditorPropsStartDate,
  change,
  messageError,
  displayAppointmentData,
  patient
}) => {
  const [previsions, setPrevisions] = useState([])

  useEffect(() => {
    if (patient) {
      change({ field: ['patientName'], changes: `${patient.personInfo?.firstName} ${patient.personInfo?.lastName}` })
      change({ field: ['patientRut'], changes: patient.personInfo?.rut })
      change({ field: ['patientPhone'], changes: patient.personInfo?.phone })
      change({ field: ['patientCellphone'], changes: patient.personInfo?.cellphone })
      change({ field: ['patientEmail'], changes: patient.personInfo?.email })
      change({ field: ['patientPrevision'], changes: patient.personInfo?.prevision })
    }
  }, [])

  useEffect(() => {
    previsionService.getAll()
      .then(response => setPrevisions(response.data.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      {
        messageError &&
          <div className={classes.errorDiv}>
            <Alert severity='error'>{messageError}</Alert>
          </div>
      }
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('patientName')}
            label='Nombre paciente'
            disabled
          />
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('patientRut')}
            label='RUT'
            style={{ width: '50%' }}
            disabled
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              id='dateOfBirth'
              label='Fecha de nacimiento'
              {...pickerEditorPropsStartDate('dateOfBirth')}
              format={'dd \'de\' LLLL \'del\' yyyy'}
              disabled
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('patientPhone')}
            label='Telefono'
            style={{ width: '50%' }}
            type='tel'
            disabled
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <TextField
            {...textEditorProps('patientCellphone')}
            label='Celular'
            style={{ width: '50%' }}
            type='tel'
            disabled
          />
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('patientEmail')}
            label='Correo électronico'
            style={{ width: '100%' }}
            disabled
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Medio de contacto preferido</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('patientPrevision')}
              disabled
            >
              {previsions.map(prevision => <MenuItem key={prevision.id} value={prevision.name}>{prevision.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

      </div>
    </>
  )
}

export default PatientInfo
