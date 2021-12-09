import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { CalendarToday, Create, Notes } from '@material-ui/icons'
import RoomIcon from '@material-ui/icons/Room'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import { useEffect, useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import { set } from 'date-fns'
import { feriadosService } from 'services/api/feriados/FeriadosService'
import { authenticationService } from 'services'
import dateUtils from 'utils/date-utils'
import DateFnsAdapter from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es/'

const AppointmentInfoForm = ({
  classes,
  textEditorProps,
  pickerEditorPropsStartDate,
  pickerEditorProps,
  displayAppointmentData,
  changeAppointment,
  boxes,
  dentists,
  appointmentTypes,
  messageError
}) => {
  const [feriados, setFeriados] = useState([])
  const currentUser = authenticationService.currentUserValue

  useEffect(() => {
    if (currentUser && !displayAppointmentData.medic) {
      changeAppointment({
        field: ['medic'], changes: currentUser.personInfo?.id
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (!displayAppointmentData.startDate) {
      changeAppointment({
        field: ['startDate'], changes: undefined
      })
      changeAppointment({
        field: ['endDate'], changes: undefined
      })
    }
  }, [])

  useEffect(() => {
    feriadosService.getAll().then(response => setFeriados(response.data)).catch(error => console.error(error))
  }, [])

  const isStartHourValid = dateUtils.isValid(dateUtils.parse(displayAppointmentData.startDate, 'yyyy-MM-dd HH:mm'))
  const defaultStartHour = isStartHourValid ? dateUtils.parse(displayAppointmentData.startDate, 'yyyy-MM-dd HH:mm') : set(new Date(), { hours: 8, minutes: 0 })

  const isEndHourValid = dateUtils.isValid(dateUtils.parse(displayAppointmentData.endDate, 'yyyy-MM-dd HH:mm'))
  const defaultEndHour = isEndHourValid ? dateUtils.parse(displayAppointmentData.endDate, 'yyyy-MM-dd HH:mm') : set(new Date(), { hours: 8, minutes: 30 })

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
          <Create className={classes.icon} color='action' />
          <TextField
            {...textEditorProps('title')}
            label='Titulo cita'
          />
        </div>
        <div className={classes.wrapper}>
          <CalendarToday className={classes.icon} color='action' />
          <MuiPickersUtilsProvider utils={DateFnsAdapter} locale={esLocale}>
            <DatePicker
              id='startDate'
              label='Fecha'
              {...pickerEditorPropsStartDate('startDate')}
              format={'EEEE dd \'de\' LLLL \'del\' yyyy'}
              shouldDisableDate={(date) => {
                const dateFormatted = dateUtils.format(date, 'yyyy-MM-dd')
                const isFeriado = feriados.map(feriado => feriado.fecha).includes(dateFormatted)
                return date.getDay() === 0 || date.getDay() === 6 || isFeriado
              }}
            />
            <TimePicker
              id='startHour'
              label='Hora de inicio'
              {...pickerEditorProps('startDate')}
              value={defaultStartHour}
              className={classes.timePicker}
              format='HH:mm'
              renderInput={(params) => <TextField {...params} />}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 18, 45)}
              disableIgnoringDatePartForTimeValidation
            />
            <TimePicker
              id='endHour'
              label='Hora de termino'
              {...pickerEditorProps('endDate')}
              value={defaultEndHour}
              className={classes.timePicker}
              format='HH:mm'
              renderInput={(params) => <TextField {...params} />}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.wrapper}>
          <RoomIcon className={classes.icon} color='action' />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Box de atención</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('box')}
              value={displayAppointmentData?.box?.id || displayAppointmentData?.box}
            >
              {boxes.map(box => <MenuItem key={box.id} value={box.id}>{box.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <RoomIcon className={classes.icon} color='action' />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Tipo de atención</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('type')}
              value={displayAppointmentData?.type?.id || displayAppointmentData?.type}
            >
              {appointmentTypes.map(type => <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <RoomIcon className={classes.icon} color='action' />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Médico</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('medic')}
              key={'medic-' + (displayAppointmentData?.medic?.id || displayAppointmentData?.personInfo?.id || displayAppointmentData?.medic)}
              value={displayAppointmentData?.medic?.id || displayAppointmentData?.personInfo?.id || displayAppointmentData?.medic}
            >
              {dentists.map(dentist => <MenuItem key={dentist.personInfo?.id} value={dentist.personInfo?.id}>{`${dentist.personInfo?.firstName} ${dentist.personInfo?.lastName}`}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color='action' />
          <TextField
            {...textEditorProps('comment')}
            label='Comentarios'
            multiline
            rows='6'
          />
        </div>
      </div>
    </>
  )
}

export default AppointmentInfoForm
