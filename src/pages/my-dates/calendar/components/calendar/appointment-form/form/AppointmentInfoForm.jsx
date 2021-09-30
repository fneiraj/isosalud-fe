import {TextField} from "@material-ui/core";
import {CalendarToday, Create, Notes} from "@material-ui/icons";
import RoomIcon from '@material-ui/icons/Room';
import {KeyboardDatePicker, MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
                   applyChanges
               }) => {


    return (
        <>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Create className={classes.icon} color="action"/>
                    <TextField
                        {...textEditorProps('title')}
                        label='Titulo cita'
                    />
                </div>
                <div className={classes.wrapper}>
                    <CalendarToday className={classes.icon} color="action"/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            id='startDate'
                            label="Fecha"
                            {...pickerEditorPropsStartDate('startDate')}
                        />
                        <TimePicker
                            id='startHour'
                            label="Hora de inicio"
                            {...pickerEditorProps('startDate')}
                            className={classes.timePicker}
                            format='HH:mm'
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id='endHour'
                            label="Hora de termino"
                            {...pickerEditorProps('endDate')}
                            className={classes.timePicker}
                            format='HH:mm'
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.wrapper}>
                    <RoomIcon className={classes.icon} color="action"/>
                    <TextField
                        {...textEditorProps('room')}
                        label='Box'
                    />
                </div>
                <div className={classes.wrapper}>
                    <Notes className={classes.icon} color="action"/>
                    <TextField
                        {...textEditorProps('comentarios')}
                        multiline
                        rows="6"
                    />
                </div>
            </div>
        </>
    )
}

export default AppointmentInfoForm;