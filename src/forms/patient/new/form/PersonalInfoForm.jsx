import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import RegionSelect from 'components/region-comuna-select/region.component'
import ComunaSelect from 'components/region-comuna-select/comuna.component'
import { genderService } from 'services/gender/GenderService'
import { previsionService } from 'services/prevision/PrevisionService'
import { locationService } from 'services/locations/LocationService'
import { userService } from 'services/user/UserService'

const PersonalInfoForm = ({
  classes,
  textEditorProps,
  displayAppointmentData,
  changeAppointment,
  isEditing
}) => {
  const [genders, setGenders] = useState([])
  const [previsions, setPrevisions] = useState([])
  const [regionSelected, setRegionSelected] = useState()
  const [comunaSelected, setComunaSelected] = useState()
  const [locations, setLocations] = useState([])
  const [userStates, setUserStates] = useState([])

  useEffect(() => {
    genderService.getAll()
      .then(response => setGenders(response.data.data))
      .catch(error => console.error(error))

    previsionService.getAll()
      .then(response => setPrevisions(response.data.data))
      .catch(error => console.error(error))

    locationService.getAll()
      .then(response => setLocations(response.data.data))
      .catch(error => console.error(error))

    userService.getUserStates()
      .then(response => setUserStates(response.data.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (displayAppointmentData.region !== undefined && !regionSelected) {
      setRegionSelected(locations?.find(l => l.id === displayAppointmentData?.region?.id))
      //      if (displayAppointmentData.commune !== undefined && regionSel) {
      //        setComunaSelected(regionSel.communes.find(com => com.id === displayAppointmentData.commune))
      //      }
    }
  }, [locations, regionSelected])

  useEffect(() => {
    if (!comunaSelected) {
      const communeSelectedValue = regionSelected?.communes?.find(c => c.id === displayAppointmentData?.commune?.communeId)
      setComunaSelected(communeSelectedValue)
    }
  }, [regionSelected])

  const handleRegionSelected = (region) => {
    setRegionSelected(region)
    setComunaSelected(undefined)
  }

  const handleComunaSelected = (commune) => {
    setComunaSelected(commune)
    changeAppointment({ field: ['commune'], changes: commune.name })
  }

  return (
    <>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <RegionSelect
            locations={locations}
            regionSelected={regionSelected}
            setRegionSelected={handleRegionSelected}
          />
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <ComunaSelect
            regionSelected={regionSelected}
            comunaSelected={comunaSelected}
            setComunaSelected={handleComunaSelected}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            width: '100%',
            height: '100%'
          }}
        >
          <TextField
            {...textEditorProps('address')}
            label='Dirección'
            style={{ width: '100%' }}
          />
        </div>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Genero</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('gender')}
              value={displayAppointmentData?.gender}
            >
              {genders.map(box => <MenuItem key={box.id} value={box.name}>{box.name}</MenuItem>)}
            </Select>
          </FormControl>
          <div style={{ marginLeft: 10, marginRight: 10 }} />
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Previsión</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('prevision')}
              value={displayAppointmentData?.prevision}
            >
              {previsions.map(box => <MenuItem key={box.id} value={box.name}>{box.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Estado usuario</InputLabel>
            <Select
              fullWidth
              {...textEditorProps('status')}
              value={displayAppointmentData?.status}
            >
              {userStates.map(box => <MenuItem key={box.id} value={box.name}>{box.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default PersonalInfoForm
