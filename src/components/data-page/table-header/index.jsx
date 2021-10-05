import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

const TableHeader = ({
  enableSelectAll,
  handleSelectAll,
  order,
  orderBy,
  onRequestSort,
  numSelected,
  rowCount,
  rows
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  const LabelWithSorter = ({ row }) => (
    <Tooltip
      title='Ordenar'
      placement={row.numeric ? 'bottom-end' : 'bottom-start'}
      enterDelay={300}
    >
      <TableSortLabel
        active={orderBy === row.id}
        direction={order}
        onClick={createSortHandler(row.id)}
      >
        {row.label}
      </TableSortLabel>
    </Tooltip>
  )

  return (
    <TableHead>
      <TableRow>
        {enableSelectAll &&
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={handleSelectAll}
            />
          </TableCell>}
        {rows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            {
                row.disableSort ? <>{row.label}</> : <LabelWithSorter row={row} />

              }
          </TableCell>
        ),
        this
        )}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
