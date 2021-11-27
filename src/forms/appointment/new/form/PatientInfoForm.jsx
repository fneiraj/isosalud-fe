import { Box, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import FormNewPatient from 'forms/patient/new'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const PatientInfoForm = ({
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
  patients,
  currentPatientData
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (currentPatientData !== undefined) {
      changeAppointment({ field: ['patient'], changes: currentPatientData })
    }
  }, [])

  const [tabValue, setTabValue] = useState(0)

  function TabPanel (props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={tabValue}
        onChange={(event, newValue) => {
          setTabValue(newValue)
        }}
        className={classes.tabs}
      >
        <Tab label='Paciente registrado' />
        <Tab label='Paciente nuevo' />
      </Tabs>
      <TabPanel value={tabValue} index={0} style={{ width: '80%' }}>
        <div>
          <Autocomplete
            id='patient'
            label='Paciente'
            value={displayAppointmentData.patient || currentPatientData || undefined}
            className={classes.textField}
            autoHighlight
            fullWidth
            options={patients}
            getOptionSelected={(option, value) => {
              return option?.personInfo?.id === value.id
            }}
            getOptionLabel={(option) => option.personInfo !== undefined ? `${option?.personInfo?.firstName} ${option?.personInfo?.lastName}` : `${option?.firstName} ${option?.lastName}`}
            onChange={(event, newValue) => changeAppointment({
              field: ['patient'], changes: newValue
            })}
            renderInput={(params) => <TextField label='Nombre paciente' variant='outlined' {...params} />}
            onError={() => null}
          />
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography>Ingresa datos del paciente</Typography>
        <FormNewPatient />
      </TabPanel>
    </div>
  )
}

export default PatientInfoForm
