import { Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import classNames from 'classnames'

const CalendarHeaderList = ({
  classes,
  handleAddNewAppointment,
  calendarType,
  setCalendarType,
  onNavigate,
  navigatorText
}) => {
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={3}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddNewAppointment}
          className={classes.fullWidthOnSmDown}
        >
          Agregar cita
        </Button>
      </Grid>
      <Grid item sm />
      <Grid item xs={12} sm={3}>
        <FormControl className={classNames(classes.floatRight, classes.fullWidthOnSmDown, classes.marginTopOnSmDown)}>
          <Select
            labelId='calendarType'
            id='calendarType'
            value={calendarType}
            onChange={event => setCalendarType(event.target.value)}
            variant='outlined'
            autoWidth
            className={classes.calendarType}
          >
            <MenuItem value='Month'>Mes</MenuItem>
            <MenuItem value='Week'>Semana</MenuItem>
            <MenuItem value='Day'>Dia</MenuItem>
            <MenuItem value='List'>Lista</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(CalendarHeaderList)
