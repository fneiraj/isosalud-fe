/* eslint-disable */
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import esLocale from 'date-fns/locale/es/'
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import DateFnsUtils from '@date-io/date-fns'
import { previsionService } from 'services/prevision/PrevisionService'
import { dentistService } from 'services/dentist/DentistService'
import RoomIcon from '@material-ui/icons/Room'
import { treatmentService } from 'services/treatments/TreatmentService'
import { authenticationService } from 'services'

const MedicInfoForm = ({
  classes,
  textEditorProps,
  pickerEditorPropsStartDate,
  change,
  messageError,
  setNextBtnEnabled,
  displayData,
  currentUser,
  specializations
}) => {
  const [dentists, setDentists] = useState([])
  const [specializationValue, setSpecializationValue] = useState(undefined)
  const [medicIdValue, setMedicIdValue] = useState(undefined)

  useEffect(() => {
    dentistService.getAll()
      .then(response => setDentists(response.data.data))
      .catch(error => console.error(error))
  }, [])



  useEffect(() => {
    if (currentUser && !displayData?.medicId) {
      setMedicIdValue(currentUser?.personInfo?.id)
      change({field: ['medicId'], changes: currentUser?.id})
    }else if (displayData?.medicId) {
      setMedicIdValue(displayData?.medicId)
    }
  }, [currentUser])

  useEffect(() => {
    if (medicIdValue !== undefined && specializationValue !== undefined) {
      setNextBtnEnabled(true)
    }else {
      setNextBtnEnabled(false)
    }

    if (displayData?.specializationId !== undefined) {
      setSpecializationValue(displayData?.specializationId)
    }

  }, [specializationValue])

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
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Médico</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('medicId')}
              key={'medic-' + (medicIdValue)}
              value={displayData?.medicId || medicIdValue}
              onChange={(e) => {
                change({field: ['medicId'], changes: e.target.value})
                setMedicIdValue(e.target.value)
              }}
            >
              {dentists.map(dentist => <MenuItem key={dentist.id} value={dentist.id}>{`${dentist.personInfo?.firstName} ${dentist.personInfo?.lastName}`}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Especialización</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('specializationId')}
              key={'specialization-' + (specializationValue)}
              value={specializationValue}
              onChange={e => {
                change({field: ['specializationId'], changes: e.target.value})
                setSpecializationValue(e.target.value)
              }}
            >
              {specializations.map(sp => <MenuItem key={sp.id} value={sp.id}>{sp.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('comment')}
            label='Titulo'
          />
        </div>

      </div>
    </>
  )
}

export default MedicInfoForm
