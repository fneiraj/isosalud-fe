import { useEffect, useState } from 'react'
import { Paper, withStyles } from '@material-ui/core'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  Toolbar,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui'
import { CurrentTimeIndicator, EditingState, ViewState } from '@devexpress/dx-react-scheduler'
import DeleteAppoinmentDialog from 'pages/my-dates/calendar/components/calendar/delete-appointment-dialog'
import { format } from 'date-fns'
import styles from './styles'
import useLocalStorage from 'hooks/useLocalStorage'
import DayScaleCell from 'pages/my-dates/calendar/components/calendar/week-day-scale-cell'
import Appointment from 'pages/my-dates/calendar/components/calendar/appointment'
import AppointmentContent from 'pages/my-dates/calendar/components/calendar/appointment-content'
import AppointmentFormWrapper from 'pages/my-dates/calendar/components/calendar/appointment-form-wrapper'
import CalendarHeader from 'pages/my-dates/calendar/components/calendar/calendar-header'
import TimeIndicator from 'pages/my-dates/calendar/components/calendar/calendar-time-indicator'
import WeekTimeTableCell from 'pages/my-dates/calendar/components/calendar/time-table-cell'
import MonthTimeTableCell from 'pages/my-dates/calendar/components/calendar/month-day-scale-cell'
import DayTimeTableCell from 'pages/my-dates/calendar/components/calendar/day-table-cell'
import useToggle from 'hooks/useToggle'
import { appointmentService } from 'services/appointment/AppointmentService'

const Calendar = () => {
  const currentDate = new Date()
  const startDayHour = 8
  const endDayHour = 19

  const [calendarType, setCalendarType] = useLocalStorage('calendarType', 'Month')
  const [data, setData] = useState([])
  const [isDeleteDialogVisible, toggleDeleteDialogVisible] = useToggle()
  const [isAppointmentFormVisible, toggleAppointmentFormVisible] = useToggle()
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined)
  const [editingAppointment, setEditingAppointment] = useState(undefined)
  const [previousAppointment, setPreviousAppointment] = useState(undefined)
  const [addedAppointment, setAddedAppointment] = useState({})
  const [isNewAppointment, setIsNewAppointment] = useState(false)

  useEffect(() => {
    appointmentService.getAllOwn()
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => console.error(error))
  }, [])

  const commitChanges = ({ added, changed, cancel }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
      appointmentService.add(added)
        .then(response => setData([...data, { id: startingAddedId, ...response.data }]))
        .catch(error => console.error(error))
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)))
    }
    if (cancel !== undefined) {
      setDeletedAppointmentId(cancel)
      toggleDeleteDialogVisible()
    }
    return { data, addedAppointment: {} }
  }

  const onAddedAppointmentChange = (_addedAppointment) => {
    setAddedAppointment(_addedAppointment)
    if (editingAppointment !== undefined) {
      setPreviousAppointment(editingAppointment)
    }
    setEditingAppointment(undefined)
    setIsNewAppointment(true)
  }

  const commitDeletedAppointment = () => {
    setDeletedAppointmentId(null)

    appointmentService.cancel(deletedAppointmentId)
      .then(response => {
        setData((prev) => {
          const startingAddedId = prev.length > 0 ? prev[data.length - 1].id + 1 : 0
          return [...prev.filter(appointment => appointment.id !== deletedAppointmentId), { id: startingAddedId, ...response.data }]
        })
      })
      .catch(error => console.error(error))

    toggleDeleteDialogVisible()
  }

  const handleAddNewAppointment = () => {
    toggleAppointmentFormVisible()
    setEditingAppointment(undefined)
    onAddedAppointmentChange({
      startDate: currentDate.setHours(startDayHour),
      endDate: currentDate.setHours(startDayHour + 1)
    })
  }

  return (
    <Paper>
      <Scheduler locale='es-CL' firstDayOfWeek={1} data={data}>
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={setEditingAppointment}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />

        <ViewState
          defaultCurrentDate={format(currentDate, 'yyyy-MM-dd')}
          currentViewName={calendarType}
        />

        <MonthView
          dayScaleCellComponent={DayScaleCell}
          timeTableCellComponent={MonthTimeTableCell}
        />

        <WeekView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          timeTableCellComponent={WeekTimeTableCell}
        />

        <DayView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          timeTableCellComponent={DayTimeTableCell}
        />

        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />

        <CurrentTimeIndicator
          shadePreviousCells
          shadePreviousAppointments
          updateInterval={10000}
          indicatorComponent={TimeIndicator}
        />

        <Toolbar />

        <DateNavigator
          rootComponent={({ onNavigate, navigatorText }) => (
            <CalendarHeader
              onNavigate={onNavigate}
              navigatorText={navigatorText}
              handleAddNewAppointment={handleAddNewAppointment}
              calendarType={calendarType}
              setCalendarType={setCalendarType}
            />
          )}
        />

        <AppointmentTooltip
          showCloseButton
          showDeleteButton
          showOpenButton
//          contentComponent={AppointmentTooltipContent}
        />

        <AppointmentForm
          overlayComponent={() => (
            <AppointmentFormWrapper
              addedAppointment={addedAppointment}
              editingAppointment={editingAppointment}
              data={data}
              editingFormVisible={isAppointmentFormVisible}
              isNewAppointment={isNewAppointment}
              setEditingAppointment={setEditingAppointment}
              previousAppointment={previousAppointment}
              setIsNewAppointment={setIsNewAppointment}
              toggleEditingFormVisibility={toggleAppointmentFormVisible}
              commitChanges={commitChanges}
            />
          )}
          visible={isAppointmentFormVisible}
          onVisibilityChange={toggleAppointmentFormVisible}
        />

      </Scheduler>

      <DeleteAppoinmentDialog
        commitDeletedAppointment={commitDeletedAppointment}
        toggleConfirmationVisible={toggleDeleteDialogVisible}
        confirmationVisible={isDeleteDialogVisible}
      />

    </Paper>
  )
}

export default withStyles(styles)(Calendar)
