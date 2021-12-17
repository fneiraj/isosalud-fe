/* eslint-disable */
import { Button, FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { treatmentService } from 'services/treatments/TreatmentService'
import useToggle from 'hooks/useToggle'
import ToothArches from 'components/tooth-arches/ToothArches'
import ProcessSelectedTable
  from 'pages/patient-profile/sub-pages/treatments/components/form-new/form/ProcessSelectedTable'

const ClinicalProccessForm = ({
  classes,
  displayData,
  change,
  setNextBtnEnable
}) => {
  const [blockOdontogramaSelect, toggleBlockOdontogramaSelect] = useToggle()
  const [clinicalProcesses, setClinicalProcesses] = useState([])
  const [odontogramaTypeSelected, setOdontogramaTypeSelected] = useState(undefined)
  const [actualProcessSelected, setActualProcessSelected] = useState(undefined)
  const [processSelectedList, setProcessSelectedList] = useState([])
  const [toothSelectedMap, setToothSelectedMapState] = useState(new Map())
  const [isAllSelected, setFlagIsAllSelected] = useState(false)

  useEffect(() => {

    if (displayData?.processes !== undefined && displayData?.processes.length > 0) {
      setProcessSelectedList(displayData.processes)
      setOdontogramaTypeSelected(displayData.odontogramaType)
      toggleBlockOdontogramaSelect()
    }


  }, [])

  useEffect(() => {
    treatmentService.getAllClinicalProcesses()
      .then(response => setClinicalProcesses(response.data.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (displayData?.processes !== undefined && displayData.processes.length > 0) {
      setNextBtnEnable(true)
    }else {
      setNextBtnEnable(false)
    }
  }, [displayData])

  const odontogramaTypes = [
    { id: 'kid', label: 'Niño'},
    { id: 'adult', label: 'Adulto'}
  ]

  const setToothSelectedMap = (key, value) => {
    toothSelectedMap.set(key, value)
  }

  const handleAddProcessClinic = () => {
    const tooths = Array.from(toothSelectedMap.values()).map(t => t.number).sort((a, b) => a - b).join(', ')

    if (!tooths || tooths === '') {
      window.alert('Debes seleccionar las piezas a trabajar')
      return
    }

    if (actualProcessSelected === undefined || actualProcessSelected === '') {
      window.alert('Debes seleccionar el procedimiento')
      return
    }

    const process = clinicalProcesses.flatMap(c => c.processes).find(p => p.id === Number(actualProcessSelected))
    const pid = `${process.id}-${new Date().getTime()}`
    setProcessSelectedList(prev => {
      const newValue = [...prev, {...process, pid: pid, pieces: isAllSelected ? 'Todas' : tooths}]
      change({field: ['processes'], changes: newValue})
      return newValue
    })
    setToothSelectedMapState(new Map())
    setFlagIsAllSelected(false)
  }

  const selectAllCallback = (isAll) => {
    setFlagIsAllSelected(isAll)
  }

  const handleRemoveProcess = (pid) => {
    setProcessSelectedList(prev => {
      const newValue = [...prev.filter(p => p.pid !== pid)]
      change({field: ['processes'], changes: newValue})
      return newValue
    })
  }

  const handlePriceChange = (pid, value) => {
    const index = processSelectedList.findIndex(p => p.pid === pid)
    const processes = [...processSelectedList]
    processes[index] =  {...processSelectedList[index], price: value}

    setProcessSelectedList(processes)
    change({field: ['processes'], changes: processes})
  }

  const handleAcceptOdontogramaType = () => {
    if (odontogramaTypeSelected === '' || odontogramaTypeSelected === undefined) {
      return
    }

    if (blockOdontogramaSelect && !window.confirm('Al cambiar se borrara los cambios que tenias realizados, ¿estas seguro?')) {
      return
    }

    if (blockOdontogramaSelect) {
      setToothSelectedMapState(new Map())
      setProcessSelectedList([])
      setActualProcessSelected(undefined)
    }

    toggleBlockOdontogramaSelect()
    change({field: ['odontogramaType'], changes: odontogramaTypeSelected})
  }

  return (
    <>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '85%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Tipo de odontograma</InputLabel>
            <Select
              key={'odntograma-select'}
              fullWidth
              native
              variant={'outlined'}
              value={odontogramaTypeSelected}
              onChange={(e) => setOdontogramaTypeSelected(e.target.value)}
              disabled={blockOdontogramaSelect}
            >
              <option aria-label="None" value="" />
              {odontogramaTypes.map(type => <option value={type.id}>{type.label}</option>)}
            </Select>
          </FormControl>
          <Button
            key={'add-process-clinic-btn'}
            variant='contained'
            color='primary'
            onClick={handleAcceptOdontogramaType}
            className={classes.button}
            style={{width: '15%'}}
          >
            {blockOdontogramaSelect ? 'Cambiar' : 'Aceptar'}
          </Button>
        </div>
        <div className={classes.wrapper}>
          <FormControl style={{ width: '85%' }}>
            <InputLabel style={{ paddingLeft: 15 }}>Procesos clinicos</InputLabel>
            <Select
              key={'process-clinic-select-'+blockOdontogramaSelect}
              fullWidth
              native
              variant='outlined'
              value={actualProcessSelected}
              onChange={(e) => {
                setActualProcessSelected(e.target.value)
              }}
              disabled={!blockOdontogramaSelect}
            >
              <option aria-label="None" value="" />
              {clinicalProcesses.map(type => (
                <optgroup label={type.name}>
                  {type?.processes?.map(process => (
                    <option value={process.id}>{process.name}</option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>
          <Button
            key={'add-process-clinic-btn'}
            variant='contained'
            color='primary'
            onClick={handleAddProcessClinic}
            className={classes.button}
            style={{width: '15%'}}
            disabled={!blockOdontogramaSelect}
          >
            Agregar
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={5} style={{align: 'center'}}>
          {blockOdontogramaSelect
            && <ToothArches
              type={odontogramaTypeSelected}
              toothsSelected={toothSelectedMap}
              setToothSelected={setToothSelectedMap}
              renderFlag={`${actualProcessSelected}-${isAllSelected}`}
              selectAllCallback={selectAllCallback}
            />}
        </Grid>
        <Grid item xs={7}>
          <ProcessSelectedTable
            processes={processSelectedList}
            handleRemoveProcess={handleRemoveProcess}
            handlePriceChange={handlePriceChange}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ClinicalProccessForm
