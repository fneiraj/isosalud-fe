import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import { Fade, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import BlockIcon from '@material-ui/icons/Block'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import Animation from 'components/animation'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useState } from 'react'
import { history } from 'helpers'
import { userService } from 'services/user/UserService'
import { useToasts } from 'react-toast-notifications'
import dateUtils from 'utils/date-utils'

const TableData = ({
  enableSelect,
  currentData,
  orderBy,
  order,
  page,
  rowsPerPage,
  selected,
  setSelected,
  setUser,
  onEditButtonClick
}) => {
  const [anchorEls, setAnchorEls] = useState({ })
  const { addToast } = useToasts()

  const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const _order = cmp(a[0], b[0])
      if (_order !== 0) return _order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  const desc = (a, b, _orderBy) => {
    if (b[_orderBy] < a[_orderBy]) {
      return -1
    }
    if (b[_orderBy] > a[_orderBy]) {
      return 1
    }
    return 0
  }

  const getSorting = (_order, _orderBy) => {
    return _order === 'desc'
      ? (a, b) => desc(a, b, _orderBy)
      : (a, b) => -desc(a, b, _orderBy)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

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

  const emptyState = () => (
    <TableBody>
      <div style={{ align: 'center' }}>
        <Animation
          loop
          autoplay
          animationName='no-records-found'
        />
        Sin datos...
      </div>
    </TableBody>
  )

  const handleClickActions = (id, event) => {
    setAnchorEls(prev => {
      return { ...prev, [id]: event.currentTarget }
    })
  }

  const handleCloseActions = (id) => {
    setAnchorEls(prev => {
      return { ...prev, [id]: null }
    })
  }

  const actions = ({ id, status }) => {
    return [
      {
        id: 'view-profile-' + id,
        label: 'Ver perfil',
        icon: <VisibilityIcon />,
        onClick: () => {
          history.push('/usuarios/' + id)
        }
      },
      {
        id: 'edit-profile-' + id,
        label: 'Editar',
        icon: <EditIcon />,
        onClick: () => {
          onEditButtonClick(id)
        }
      },
      {
        id: 'enable-disable-profile-' + id,
        label: status === 'Habilitado' ? 'Deshabilitar' : 'Habilitar',
        icon: status === 'Habilitado' ? <BlockIcon /> : <CheckCircleOutlineRoundedIcon />,
        onClick: () => {
          userService.changeStatus({ userId: id, status: status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado' })
            .then(response => {
              addToast('Usuario ' + (status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado') + ' con éxito', { appearance: 'success', autoDismiss: true })
              setUser(response.data)
            })
            .catch(error => {
              addToast('Error al ' + (status === 'Habilitado' ? 'Deshabilitar' : 'Habilitar') + ' usuario', { appearance: 'error', autoDismiss: true })
              console.error(error)
            })
        }
      }
    ]
  }

  const renderRows = () => {
    return stableSort(currentData, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(n => {
        const lastLoginFormated = n.lastLogin ? dateUtils.format(dateUtils.parse(n.lastLogin, 'yyyy-MM-dd HH:mm:ss'), 'dd-MM-yyy HH:mm') : 'Sin registro'

        const isActualSelected = isSelected(n.id)

        return (
          <TableRow
            hover
            onClick={event => {
              if (enableSelect) handleClick(event, n.id)
            }}
            role='checkbox'
            aria-checked={isActualSelected}
            tabIndex={-1}
            key={n.id}
            selected={isActualSelected}
          >
            {enableSelect &&
              <TableCell padding='checkbox'>
                <Checkbox checked={isActualSelected} />
              </TableCell>}
            <TableCell>{n.username}</TableCell>
            <TableCell>{n.personInfo?.firstName} {n.personInfo?.lastName}</TableCell>
            <TableCell>{n.personInfo?.rut}</TableCell>
            <TableCell>{n.personInfo?.cellphone}</TableCell>
            <TableCell>{lastLoginFormated}</TableCell>
            <TableCell>{n.status}</TableCell>
            <TableCell>
              <IconButton
                onClick={(event) => handleClickActions(n.id, event)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={n.id}
                anchorEl={anchorEls[n.id]}
                open={Boolean(anchorEls[n.id])}
                keepMounted
                TransitionComponent={Fade}
                onClose={(event) => handleCloseActions(n.id, event)}
              >
                {actions(n).map(a =>
                  <MenuItem
                    key={'view-profile-' + n.id}
                    onClick={() => {
                      handleCloseActions(n.id)
                      a.onClick()
                    }}
                  >
                    <ListItemIcon>
                      {a.icon}
                    </ListItemIcon>
                    <ListItemText primary={a.label} />
                  </MenuItem>
                )}

              </Menu>
            </TableCell>
          </TableRow>
        )
      })
  }

  return (
    <TableBody>
      {currentData.length === 0 ? emptyState() : renderRows()}
    </TableBody>
  )
}

export default TableData
