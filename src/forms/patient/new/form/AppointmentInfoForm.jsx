import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { CalendarToday, Create, Notes } from '@material-ui/icons'
import RoomIcon from '@material-ui/icons/Room'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import esLocale from 'date-fns/locale/es/'
import DateFnsUtils from '@date-io/date-fns'
import { useEffect } from 'react'

const AppointmentInfoForm = ({
  classes,
  cancelChanges,
  isNewAppointment,
  textEditorProps,
  pickerEditorPropsStartDate,
  pickerEditorProps,
  displayAppointmentData,
  changeAppointment,
  visibleChange,
  commitAppointment,
  applyChanges,
  boxes,
  appointmentTypes
}) => {
  useEffect(() => {
    changeAppointment({
      field: ['startDate'], changes: new Date()
    })
    changeAppointment({
      field: ['endDate'], changes: new Date()
    })
  }, [])

  return (
    <>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              id='startDate'
              label='Fecha'
              {...pickerEditorPropsStartDate('startDate')}
              format={'EEEE dd \'de\' LLLL \'del\' yyyy'}
              shouldDisableDate={(date) => {
                return date.getDay() === 0 || date.getDay() === 6
              }}
            />
            <TimePicker
              id='startHour'
              label='Hora de inicio'
              {...pickerEditorProps('startDate')}
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
