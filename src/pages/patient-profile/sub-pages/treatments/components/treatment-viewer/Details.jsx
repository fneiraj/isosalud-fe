import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const Details = ({ classes, treatment }) => {
  const processes = treatment.processes

  const moneyFormatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'

    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const ProcessRender = ({ id, description, name, paymentStatus, pieces, price, type }) => {
    return (
      <TableRow key={id} className={classes.tableRow}>
        <TableCell align='left'>{name}</TableCell>
        <TableCell align='left'>{pieces}</TableCell>
        <TableCell align='left'>{moneyFormatter.format(price)}</TableCell>
        <TableCell align='right'>{paymentStatus}</TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer style={{ borderBottom: 'none' }}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Procedimiento clinico</TableCell>
            <TableCell align='left' style={{ width: 130 }}>PIEZAS</TableCell>
            <TableCell align='left' style={{ width: 130 }}>PRECIO</TableCell>
            <TableCell align='right' style={{ width: 130 }}>ESTADO PAGO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processes && processes.map(p => <ProcessRender key={p.id} {...p} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Details
