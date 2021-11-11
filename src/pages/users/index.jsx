import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import IconButton from '@material-ui/core/IconButton'
import EnhancedTableHead from '../../components/datatables/EnhancedTableHead'
import EnhancedTableToolbar from '../../components/datatables/EnhancedTableToolbar'
import { AppBar, Grid, TextField, Toolbar, Tooltip } from '@material-ui/core'
import { DataMock } from 'mock/data'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormNewPatient from './components/FormNewPatient'
import { userService } from 'services/user/UserService'

const rows = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Nombre de usuario' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Apellido' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Estado' },
  { id: 'registerDate', numeric: false, disablePadding: false, label: 'Fecha registro' },
  { id: 'actions', numeric: false, disablePadding: false, disableSort: true, label: 'Acciones' }
]

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

const styles = theme => ({
  root: {
    width: '100%'
    //    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  modal: {
    marginTop: 70,
    marginBottom: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'scroll',
    width: '50%'
  },
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(1, 3, 2),
    width: '100%',
    height: '100%'
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  }
})

// eslint-disable-next-line no-unused-vars
const user = {
  firstName: 'Fernando',
  lastName: 'Neira',
  rut: '11.111.111-1',
  email: 'fe.neiraj@gmail.com',
  convenio: 'Isapre',
  sexo: 'masculino',
  dateOfBirth: '15/10/1999',
  phone: '+452222222',
  cellPhone: '+56999999999',
  address: 'Calle S/N #1234',
  commune: 'Temuco',
  city: 'Temuco'
}

const userEmpty = {
  firstName: '',
  lastName: '',
  rut: '',
  email: '',
  convenio: '',
  sexo: '',
  dateOfBirth: '',
  phone: '',
  cellPhone: '',
  address: '',
  commune: '',
  city: ''
}

const UsersPage = ({ classes }) => {
  const [data, setData] = useState(DataMock.users)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [selected, setSelected] = useState([])
  const [currentData, setCurrentData] = useState(data)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchText, setSearchText] = useState('')

  const [userData, setUserData] = useState(userEmpty)
  const [newPatientFormVisible, setNewPatientFormVisible] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(response => setUsers(response.data))
      .catch(error => console.log(error))
    console.log(users)
  }, [])

  const toggleNewPatientFormVisibility = () => {
    setNewPatientFormVisible(!newPatientFormVisible)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData,
    validationSchema:
      Yup.object().shape({
        firstName: Yup.string().required('Debes ingresar el nombre de usuario.'),
        lastName: Yup.string().required('Debes ingresar la contraseña.'),
        rut: Yup.string().required('Debes ingresar el rut'),
        email: Yup.string().optional(),
        convenio: Yup.string().required('Debes ingresar el convenio'),
        sexo: Yup.string().required(),
        dateOfBirth: Yup.string().required(),
        phone: Yup.string().required(),
        cellPhone: Yup.string().required(),
        address: Yup.string().optional(),
        commune: Yup.string().optional(),
        city: Yup.string().optional()
      }),
    onSubmit (user, { setStatus, setSubmitting }) {
      setStatus()
      /*      userService.updatePatient(user)
                .then(
                    user => {
                        console.log('actualizado')
                    },
                    error => {
                        setStatus(error);
                    }
                );
                */
      setUserData({ ...userData, ...user })
      setSubmitting(false)
    }
  })

  // eslint-disable-next-line no-unused-vars
  const formNewPatient = () => {
    return (
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <Grid item xs={12}>
          <Grid container justify='flex-start' spacing={4}>
            <Grid key='firstName' item>
              <TextField
                name='firstName'
                id='firstName'
                label='Nombres'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName && formik.touched.firstName}
                helperText={formik.errors.firstName}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='lastName' item>
              <TextField
                name='lastName'
                id='lastName'
                label='Apellidos'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName && formik.touched.lastName}
                helperText={formik.errors.lastName}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='rut' item>
              <TextField
                name='rut'
                id='rut'
                label='RUT'
                value={formik.values.rut}
                onChange={formik.handleChange}
                error={formik.errors.rut && formik.touched.rut}
                helperText={formik.errors.rut}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
          </Grid>
          <Grid container justify='flex-start' spacing={4}>
            <Grid key='email' item>
              <TextField
                name='email'
                id='email'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='convenio' item>
              <TextField
                name='convenio'
                id='convenio'
                label='Convenio'
                value={formik.values.convenio}
                onChange={formik.handleChange}
                error={formik.errors.convenio && formik.touched.convenio}
                helperText={formik.errors.convenio}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='sexo' item>
              <TextField
                name='sexo'
                id='sexo'
                label='Sexo'
                value={formik.values.sexo}
                onChange={formik.handleChange}
                error={formik.errors.sexo && formik.touched.sexo}
                helperText={formik.errors.sexo}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
          </Grid>
          <Grid container justify='flex-start' spacing={4}>
            <Grid key='dateOfBirth' item>
              <TextField
                name='dateOfBirth'
                id='dateOfBirth'
                label='Fecha de nacimiento'
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
                helperText={formik.errors.dateOfBirth}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='phone' item>
              <TextField
                name='phone'
                id='phone'
                label='Telefono'
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone && formik.touched.phone}
                helperText={formik.errors.phone}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='cellPhone' item>
              <TextField
                name='cellPhone'
                id='cellPhone'
                label='Celular'
                value={formik.values.cellPhone}
                onChange={formik.handleChange}
                error={formik.errors.cellPhone && formik.touched.cellPhone}
                helperText={formik.errors.cellPhone}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
          </Grid>
          <Grid container justify='flex-start' spacing={4}>
            <Grid key='address' item>
              <TextField
                name='address'
                id='address'
                label='Direccion'
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address && formik.touched.address}
                helperText={formik.errors.address}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='commune' item>
              <TextField
                name='commune'
                id='commune'
                label='Comuna'
                value={formik.values.commune}
                onChange={formik.handleChange}
                error={formik.errors.commune && formik.touched.commune}
                helperText={formik.errors.commune}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
            <Grid key='city' item>
              <TextField
                name='city'
                id='city'
                label='Ciudad'
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.errors.city && formik.touched.city}
                helperText={formik.errors.city}
                fullWidth
                margin='normal'
                InputLabelProps={{ style: styles.labelEditText }}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    )
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(currentData.map(n => n.id))
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, page) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
    if (event.target.value) {
      setCurrentData(data.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())))
    } else {
      setCurrentData(data)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleAddPatient = () => {

  }

  const handleRefreshData = () => {
    setData(DataMock.patients2())
    setCurrentData(data)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  // const emptyRowsMoreFiveData = rowsPerPage - Math.min(rowsPerPage, currentData.length - page * rowsPerPage);
  // const emptyRows = currentData.length > 5 ? emptyRowsMoreFiveData : 0;

  return (
    <>
      <Paper className={classes.root}>
        <AppBar className={classes.searchBar} position='static' color='default' elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <SearchIcon className={classes.block} color='inherit' />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder='Buscar usuarios por nombre'
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput
                  }}
                  value={searchText}
                  onChange={handleSearch}
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained' color='primary' className={classes.addUser}
                  onClick={toggleNewPatientFormVisibility}
                >
                  Agregar usuario
                </Button>
                <Tooltip title='Actualizar'>
                  <IconButton onClick={handleRefreshData} style={{ marginLeft: 15 }}>
                    <RefreshIcon className={classes.block} color='inherit' />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <EnhancedTableToolbar tableTitle='Usuarios sistema' numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rows={rows}
              rowCount={currentData.length}
            />
            <TableBody>
              {stableSort(currentData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isActualSelected = isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, n.id)}
                      role='checkbox'
                      aria-checked={isActualSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isActualSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isActualSelected} />
                      </TableCell>
                      {/* <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.calories}</TableCell>
                      <TableCell align="right">{n.fat}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.protein}</TableCell> */}
                      {/* <TableCell>{n.id}</TableCell> */}
                      <TableCell padding='none'>{n.username}</TableCell>
                      <TableCell>{n.firstName}</TableCell>
                      <TableCell>{n.lastName}</TableCell>
                      <TableCell>Habilitado</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link className='button' to={`/admin/usuarios/${n.id}`}>
                          <Button>
                            <Tooltip title='Ver datos personales'>
                              <VisibilityIcon />
                            </Tooltip>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {/* emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            ) */}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 30, 50, 70, 90, 100]}
          component='div'
          count={currentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Siguiente'
          }}
          nextIconButtonProps={{
            'aria-label': 'Anterior'
          }}
          labelRowsPerPage='Registros por pagina'
          labelDisplayedRows={({ from, to, count }) => (from + '-' + to + ' de ' + (count !== -1 ? count : to))}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <FormNewPatient />
    </>
  )
}

export default withStyles(styles)(UsersPage)
