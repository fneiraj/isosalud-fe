import { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TablePagination from 'components/data-page/table-pagination'
import Paper from '@material-ui/core/Paper'
import styles from './styles'
import HeaderData from 'components/data-page/header'
import TableHeader from 'components/data-page/table-header'
import { patientService } from 'services/patient/PatientService'
import TableData from './components/table-data'
import useToggle from 'hooks/useToggle'
import FormNewPatient from 'forms/patient/new'

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'treatments', numeric: false, disablePadding: false, label: 'RUT' },
  { id: 'nextMeeting', numeric: false, disablePadding: false, label: 'Próxima cita' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Celular' },
  { id: 'actions', numeric: false, disablePadding: false, disableSort: true, label: 'Acciones' }
]

const PatientsPage = ({ classes }) => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newPatientFormVisible, toggleNewPatientFormVisible] = useToggle()
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentData, setCurrentData] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    patientService.getAll()
      .then(res => {
        setData(res.data.data)
        setCurrentData(res.data.data)
      })
      .catch(error => console.error(error))
  }, [])

  const toggleNewPatientFormVisibility = () => {
    toggleNewPatientFormVisible()
  }

  const handleRequestSort = (event, property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleChangePage = (event, value) => setPage(value)

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value)

  const findNameOrRut = (p, value) => {
    const personInfo = p.personInfo
    const valueWithoutPoint = value.replaceAll('.', '')
    const rutWithoutPoint = personInfo.rut?.replaceAll('.', '')
    return personInfo.firstName.toLowerCase().includes(value.toLowerCase()) || personInfo.lastName.toLowerCase().includes(value.toLowerCase()) || rutWithoutPoint?.includes(valueWithoutPoint)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
    setPage(1)
    if (event.target.value) {
      setCurrentData(data.filter(p => findNameOrRut(p, event.target.value)))
    } else {
      setCurrentData(data)
    }
  }

  return (
    <>
      <Paper className={classes.root}>

        <HeaderData
          searchText={searchText}
          handleSearch={handleSearch}
          placeholderSearchInput='Buscar paciente por Nombre o RUT...'
          enableRefreshData={false}
          enableButtonNewData
          handleOnClickNewData={toggleNewPatientFormVisibility}
          newDataText='Agregar paciente'
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='Pacientes'>

            <TableHeader
              enableSelectAll={false}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rows={rows}
              numSelected={selected.length}
              rowCount={currentData.length}
            />

            <TableData
              enableSelect={false}
              currentData={currentData}
              orderBy={orderBy}
              order={order}
              page={page - 1}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
            />

          </Table>
        </div>

        <TablePagination
          count={currentData.length}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <FormNewPatient
        visible={newPatientFormVisible}
        toggleVisible={toggleNewPatientFormVisible}
      />
    </>
  )
}

export default withStyles(styles)(PatientsPage)
