/* eslint-disable */
import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { treatmentService } from 'services/treatments/TreatmentService'

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
  textEditorProps,
  displayAppointmentData,
  changeAppointment,
  patients,
  currentPatientData,
}) => {
  const classes = useStyles()
  const [isFromProfile, setIsFromProfile] = useState(false)
  const [patientTreatments, setPatientTreatments] = useState([])

  useEffect(() => {
    const currentId = currentPatientData?.id || displayAppointmentData?.patient?.id
    if (currentId !== undefined) {
      treatmentService.getAllByPatientId(currentId ? currentId : displayAppointmentData?.patient?.id)
        .then(response => setPatientTreatments(response.data.data))
        .catch(error => console.error(error))
    }
    changeAppointment({field: ['treatmentId'], changes: -1})
  }, [displayAppointmentData?.patient?.id])

  useEffect(() => {
    if (currentPatientData !== undefined) {
      changeAppointment({ field: ['patient'], changes: currentPatientData })
      setIsFromProfile(true)
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
        <Tab label='Paciente nuevo' disabled={isFromProfile} />
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
            disabled={isFromProfile}
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
        <div style={{marginTop: 30}}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Tratamiento</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('medicId')}
              key={'treatment-relation-'}
              value={displayAppointmentData?.treatmentId}
              onChange={(e) => {
                changeAppointment({field: ['treatmentId'], changes: e.target.value})
              }}
            >
              <MenuItem key={'none'} value={-1}>Ninguno</MenuItem>
              {patientTreatments.map(tr => <MenuItem key={tr.id} value={tr.id}>{`${tr.specialization?.name} - ${tr.medic?.personInfo?.firstName} ${tr.medic?.personInfo?.lastName}`}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography>Ingresa datos del paciente</Typography>
      </TabPanel>
    </div>
  )
}

export default PatientInfoForm
