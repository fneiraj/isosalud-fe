import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import RegionSelect from 'components/region-comuna-select/region.component'
import ComunaSelect from 'components/region-comuna-select/comuna.component'
import { genderService } from 'services/gender/GenderService'
import { previsionService } from 'services/prevision/PrevisionService'

const PersonalInfoForm = ({
  classes,
  textEditorProps,
  displayAppointmentData,
  changeAppointment
}) => {
  const [genders, setGenders] = useState([])
  const [previsions, setPrevisions] = useState([])
  const [regionSelected, setRegionSelected] = useState()
  const [comunaSelected, setComunaSelected] = useState()

  useEffect(() => {
    genderService.getAll()
      .then(response => setGenders(response.data.data))
      .catch(error => console.error(error))

    previsionService.getAll()
      .then(response => setPrevisions(response.data.data))
      .catch(error => console.error(error))
  }, [])

  const handleComunaSelected = (commune) => {
    setComunaSelected(commune)
    changeAppointment({ field: ['commune'], changes: commune.name })
  }

  return (
    <>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <RegionSelect
            regionSelected={regionSelected}
            setRegionSelected={setRegionSelected}
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
      </div>
    </>
  )
}

export default PersonalInfoForm
