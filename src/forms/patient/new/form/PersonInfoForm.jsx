import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import esLocale from 'date-fns/locale/es/'
import DateFnsUtils from '@date-io/date-fns'
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { rolesService } from 'services/roles/RolesService'
import { contactMeansService } from 'services/contact-means/ContactMeansService'
import Alert from '@material-ui/lab/Alert'

const PersonInfoForm = ({
  classes,
  textEditorProps,
  pickerEditorPropsStartDate,
  changeAppointment,
  messageError,
  displayAppointmentData,
  preloadData,
  isEditing,
  rolDefault
}) => {
  const [roles, setRoles] = useState([])
  const [contactMeans, setContactMeans] = useState([])

  useEffect(() => {
    if (!displayAppointmentData.dateOfBirth) {
      changeAppointment({
        field: ['dateOfBirth'], changes: new Date(1, 1, 1990)
      })
    }

    if (rolDefault) {
      changeAppointment({
        field: ['roleName'], changes: 'ROLE_PATIENT'
      })
    }
  }, [])

  useEffect(() => {
    rolesService.getAll()
      .then(response => setRoles(response.data.data))
      .catch(error => console.error(error))

    contactMeansService.getAll()
      .then(response => setContactMeans(response.data.data))
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
            {...textEditorProps('firstName')}
            label='Nombres'
            style={{ width: '50%' }}
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <TextField
            {...textEditorProps('lastName')}
            label='Apellidos'
            style={{ width: '50%' }}
          />
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('rut')}
            label='RUT'
            style={{ width: '50%' }}
            disabled={isEditing}
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              id='dateOfBirth'
              label='Fecha de nacimiento'
              {...pickerEditorPropsStartDate('dateOfBirth')}
              format={'dd \'de\' LLLL \'del\' yyyy'}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('phone')}
            label='Telefono'
            style={{ width: '50%' }}
            type='tel'
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <TextField
            {...textEditorProps('cellphone')}
            label='Celular'
            style={{ width: '50%' }}
            type='tel'
          />
        </div>
        <div className={classes.wrapper}>
          <TextField
            {...textEditorProps('username')}
            label='Nombre de usuario'
            style={{ width: '50%' }}
            disabled
            key={preloadData ? 'username' : 'username-waiting'}
            value={preloadData?.username || displayAppointmentData?.username || ''}
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <TextField
            {...textEditorProps('password')}
            label='Contraseña'
            style={{ width: '50%' }}
            disabled
            defaultValue=''
            value={preloadData?.username || (displayAppointmentData?.username ? '*******' : '') || ''}
          />
        </div>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Rol</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('roleName')}
              key={'roleName-' + displayAppointmentData?.roleName}
              value={displayAppointmentData?.roleName}
            >
              {roles.map(box => <MenuItem key={box.id} value={box.name}>{box.spanishName}</MenuItem>)}
            </Select>
          </FormControl>
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Medio de contacto preferido</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('preferredContactMeanName')}
              value={displayAppointmentData?.preferredContactMeanName}
            >
              {contactMeans.map(box => <MenuItem key={box.id} value={box.name}>{box.spanishName}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            marginTop: 10,
            width: '100%',
            height: '100%'
          }}
        >
          <TextField
            {...textEditorProps('email')}
            label='Correo électronico'
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </>
  )
}

export default PersonInfoForm
