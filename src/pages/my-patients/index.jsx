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
import { appointmentService } from 'services/appointment/AppointmentService'
import { useToasts } from 'react-toast-notifications'
import DeletePatientDialog from 'forms/patient/new/components/delete-dialog'
import DateFnsAdapter from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es/'

const dateFnsInstance = new DateFnsAdapter({ locale: esLocale })

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'rut', numeric: false, disablePadding: false, label: 'RUT' },
  { id: 'nextMeeting', numeric: false, disablePadding: false, label: 'Próxima cita' },
  { id: 'cellphone', numeric: false, disablePadding: false, label: 'Celular' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Acciones' }
]

const PatientsPage = ({ classes }) => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isNewUserFormVisible, toggleNewUserFormVisible] = useToggle()
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentData, setCurrentData] = useState([])
  const [selected, setSelected] = useState([])
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined)
  const [isDeleteDialogVisible, toggleDeleteDialogVisible] = useToggle()
  const [currentUserEditing, setCurrentUserEditing] = useState(undefined)
  const { addToast } = useToasts()

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

  const commitChanges = ({ added, changed, cancel }) => {
    if (added) {
      userService.create(added)
        .then(response => {
          setData(prev => {
            const newData = [...prev, response.data]
            setCurrentData(newData)
            return newData
          })
          addToast('Usuario agregado correctamente', { appearance: 'success', autoDismiss: true })
        })
        .catch(error => {
          console.error(error)
          addToast('Error al agregar usuario', { appearance: 'error', autoDismiss: true })
        })
    }
    if (changed) {
      console.log({ changed })

      userService.edit(changed)
        .then(response => {
          setData(prev => {
            const newData = [...prev.filter(u => u.id !== response.data.id), response.data]
            setCurrentData(newData)
            return newData
          })
          addToast('Usuario editado correctamente', { appearance: 'success', autoDismiss: true })
        })
        .catch(error => {
          console.error(error)
          addToast('Error al editar usuario', { appearance: 'error', autoDismiss: true })
        })

      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment))
      )

      setCurrentUserEditing(undefined)
    }
    if (cancel !== undefined) {
      setDeletedAppointmentId(cancel)
      toggleDeleteDialogVisible()
    }
    return { data, addedAppointment: {} }
  }

  const setUser = (user) => {
    setData(prev => {
      const tmp = [...prev.filter(u => u.id !== user.id), user]
      setCurrentData(tmp)
      return tmp
    })
  }

  const onEditButtonClick = (id) => {
    const user = data.find(u => u.id === id)
    const dateOfBirth = dateFnsInstance.parse(user.personInfo?.dateOfBirth, 'yyyy-MM-dd')

    setCurrentUserEditing({
      id: id,
      dateOfBirth: dateOfBirth,
      firstName: user.personInfo?.firstName,
      lastName: user.personInfo?.lastName,
      rut: user.personInfo?.rut,
      phone: user.personInfo?.phone,
      cellphone: user.personInfo?.cellphone,
      roleName: user.roleName,
      preferredContactMeanName: user.preferredContactMeanName,
      email: user.personInfo?.email,
      commune: user.personInfo?.addressInfo,
      region: user.personInfo?.addressInfo?.region,
      address: user.personInfo?.addressInfo?.street,
      gender: user.personInfo?.gender,
      prevision: user.personInfo?.prevision,
      username: user.username,
      status: user.status
    })
    toggleNewUserFormVisible()
  }

  const commitDeletedAppointment = () => {
    setDeletedAppointmentId(null)

    appointmentService.cancel(deletedAppointmentId)
      .then(response => {
        setData((prev) => {
          const startingAddedId = prev.length > 0 ? prev[data.length - 1].id + 1 : 0
          return [...prev.filter(appointment => appointment.id !== deletedAppointmentId), { id: startingAddedId, ...response.data }]
        })
        addToast('Cita cancelada correctamente', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        console.error(error)
        addToast('Error al cancelar cita', { appearance: 'error', autoDismiss: true })
      })

    toggleDeleteDialogVisible()
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
              setUser={setUser}
              onEditButtonClick={onEditButtonClick}
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
        key={isNewUserFormVisible ? 'form-visible' : 'form-no-visible'}
        commitChanges={commitChanges}
        visible={isNewUserFormVisible}
        toggleVisible={toggleNewUserFormVisible}
        currentUserData={currentUserEditing}
        setCurrentUserEditing={setCurrentUserEditing}
        rolDefault='patient'
      />

      <DeletePatientDialog
        commitDeletedAppointment={commitDeletedAppointment}
        toggleConfirmationVisible={toggleDeleteDialogVisible}
        confirmationVisible={isDeleteDialogVisible}
      />
    </>
  )
}

export default withStyles(styles)(PatientsPage)
