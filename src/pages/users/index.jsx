import { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TablePagination from 'components/data-page/table-pagination'
import Paper from '@material-ui/core/Paper'
import styles from './styles'
import HeaderData from 'components/data-page/header'
import TableHeader from 'components/data-page/table-header'
import TableData from './components/table-data'
import useToggle from 'hooks/useToggle'
import { userService } from 'services/user/UserService'
import FormNewPatient from 'forms/patient/new'

const rows = [
  { id: 'username', numeric: false, disablePadding: false, label: 'Usuario' },
  { id: 'personInfo.firstname', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'personInfo.rut', numeric: false, disablePadding: false, label: 'RUT' },
  { id: 'cellphone', numeric: false, disablePadding: false, label: 'Celular' },
  { id: 'lastLogin', numeric: false, disablePadding: false, label: 'Último acceso' },
  { id: 'actions', numeric: false, disablePadding: false, disableSort: true, label: 'Acciones' }
]

const UsersPage = ({ classes }) => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isNewUserFormVisible, toggleNewUserFormVisible] = useToggle()
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentData, setCurrentData] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(res => {
        setData(res.data.data)
        setCurrentData(res.data.data)
      })
      .catch(error => console.error(error))
  }, [])

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
          placeholderSearchInput='Buscar usuario por Nombre, RUT o usuario...'
          enableRefreshData={false}
          enableButtonNewData
          handleOnClickNewData={toggleNewUserFormVisible}
          newDataText='Agregar usuario'
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='Usuarios'>

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
        visible={isNewUserFormVisible}
        toggleVisible={toggleNewUserFormVisible}
      />
    </>
  )
}

export default withStyles(styles)(UsersPage)
