import NewAppointmentForm from 'forms/appointment/new'

const AppointmentFormWrapper = ({
  data,
  editingAppointment,
  addedAppointment,
  isNewAppointment,
  setEditingAppointment,
  previousAppointment,
  setIsNewAppointment,
  editingFormVisible,
  commitChanges,
  toggleEditingFormVisibility
}) => {
  const currentAppointment = data
    .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0] ||
    addedAppointment

  const cancelAppointment = () => {
    if (isNewAppointment) {
      setEditingAppointment(previousAppointment)
      setIsNewAppointment(false)
    }
  }

  return (
    <NewAppointmentForm
      visible={editingFormVisible}
      appointmentData={currentAppointment}
      commitChanges={commitChanges}
      visibleChange={toggleEditingFormVisibility}
      onEditingAppointmentChange={setEditingAppointment}
      cancelAppointment={cancelAppointment}
    />
  )
}

export default AppointmentFormWrapper
