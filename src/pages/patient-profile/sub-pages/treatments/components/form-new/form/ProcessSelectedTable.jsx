/* eslint-disable */
import {
  IconButton, Input, InputAdornment, OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 340,
  },
});

const ProcessSelectedTable = ({processes, handlePriceChange, handleRemoveProcess}) => {
  const classes = useStyles();

  const EmptyRow = () => (
    <TableRow hover key={'empty'}>
      <TableCell>
        Sin registros.
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={'name'}>Procedimiento</TableCell>
              <TableCell key={'pieces'} size={'small'}>Piezas</TableCell>
              <TableCell key={'price'} align={'center'} size={'small'}>Precio</TableCell>
              <TableCell key={'actions'} align={'right'} size={'small'} />
            </TableRow>
          </TableHead>
          <TableBody>
            {processes && processes.length > 0 ? processes.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell key={row.id + '-name'}>{row.name}</TableCell>
                  <TableCell key={row.id + '-pieces'} size={'small'}>{row.pieces}</TableCell>
                  <TableCell key={row.id + '-price'} align={'right'} alignRight size={'small'}>
                      <Input
                        value={row.price}
                        onChange={(e) => handlePriceChange(row.pid, e.target.value)}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        disableUnderline
                        type={'tel'}
                        inputProps={{style: {
                          maxWidth: 100
                          }}}
                      />
                  </TableCell>
                  <TableCell key={row.id + '-delete'} align={'right'} size={'small'}>
                    <IconButton onClick={() => handleRemoveProcess(row.pid)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }) : <EmptyRow />}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ProcessSelectedTable;