import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Animation from 'components/animation'
import dateUtils from 'utils/date-utils'

const TableData = ({
  enableSelect,
  currentData,
  orderBy,
  order,
  page,
  rowsPerPage,
  selected,
  setSelected
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
        const nextMeetingFormatted = n.nextMeeting ? dateUtils.format(dateUtils.parse(n.nextMeeting, 'yyyy-MM-dd HH:mm:ss'), 'dd-MM-yyy HH:mm') : 'Sin registro'

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
            {/* <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.calories}</TableCell>
                      <TableCell align="right">{n.fat}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.protein}</TableCell> */}
            {/* <TableCell>{n.id}</TableCell> */}
            <TableCell>{n.personInfo?.firstName} {n.personInfo?.lastName}</TableCell>
            <TableCell>{n.personInfo?.rut}</TableCell>
            <TableCell>{nextMeetingFormatted}</TableCell>
            <TableCell>{n.personInfo?.cellphone}</TableCell>
            <TableCell>
              <Link className='button' to={`/pacientes/${n.id}`}>
                <Button>
                  <Tooltip title='Ver ficha clínica'>
                    <VisibilityIcon />
                  </Tooltip>
                </Button>
              </Link>
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
