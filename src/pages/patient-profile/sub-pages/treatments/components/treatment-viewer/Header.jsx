import { Grid, IconButton, Tooltip } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import CancelIcon from '@material-ui/icons/Cancel'
import React from 'react'

const Header = ({ handleClose, handlePrint }) => {
  return (
    <Grid container>
      <Grid item xs />
      <Grid item style={{ marginRight: 15 }}>
        <Tooltip title='Imprimir' disableRipple>
          <IconButton onClick={handlePrint}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Cerrar' disableRipple>
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default Header
