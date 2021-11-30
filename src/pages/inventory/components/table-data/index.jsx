import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import { IconButton, Tooltip } from '@material-ui/core'
import Animation from 'components/animation'
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import EditIcon from '@material-ui/icons/Edit'

const TableData = ({
  enableSelect,
  currentData,
  orderBy,
  order,
  page,
  rowsPerPage,
  selected,
  setSelected,
  moneyFormatter,
  minusOneHandler,
  plusOneHandler,
  editHandler
}) => {
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

  const renderRows = () => {
    return stableSort(currentData, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(n => {
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
            <TableCell>{n.name}</TableCell>
            <TableCell>{n.productType?.name}</TableCell>
            <TableCell>{moneyFormatter.format(n.price)}</TableCell>
            <TableCell>{n.quantity === 0 ? 'Sin stock' : n.quantity}</TableCell>
            <TableCell>
              <Tooltip title='Menos uno'>
                <IconButton onClick={() => minusOneHandler(n.id)}>
                  <ExposureNeg1Icon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Mas uno'>
                <IconButton onClick={() => plusOneHandler(n.id)}>
                  <PlusOneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Editar'>
                <IconButton onClick={() => editHandler(n.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

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
