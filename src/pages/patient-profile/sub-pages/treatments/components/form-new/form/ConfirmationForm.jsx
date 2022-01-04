/* eslint-disable */
import { Grid, makeStyles, Typography } from '@material-ui/core'
import dateUtils from 'utils/date-fns-utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  gridWrapper: {
    border: "1px solid grey",
    display: "grid",
    backgroundColor: "grey",
    gridRowGap: 1,
    gridColumnGap: 1,
    gridTemplateAreas: `
    "title title title"
    "a1 a2 a3"
    "b1 b2 b3"
    "c1 c2 c3"
    `,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    "& > *": {
      backgroundColor: "white"
    }
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  bottomRight: {
    justifyContent: "flex-end"
  },
  outerColumn: {
    borderRight: "1px solid #66C2EF",
    borderBottom: "1px solid #66C2EF",
    borderLeft: "1px solid #66C2EF",
  },
  centerColumn: {
    borderBottom: "1px solid #66C2EF",
//    borderRadius: '15px'
  }
}));

const ConfirmationForm = ({
  displayAppointmentData,
  preloadData,
  specializations
}) => {

  const classes = useStyles();

  const moneyFormatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const specializationName = specializations && specializations.length > 0 ? specializations.find(s => s.id === displayAppointmentData?.specializationId)?.name : displayAppointmentData?.specializationId 

  const ProcessName = ({name, isLast}) => (
    <Grid item className={classes.outerColumn} style={isLast? {borderRight: '0px', borderBottomLeftRadius: '15px'} : {borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>{name}</Typography>
        </Grid>
  )

  const ProcessPiece = ({name, isLast}) => (
    <Grid item className={classes.outerColumn} style={isLast? {borderRight: '0px', borderBottomLeftRadius: '15px'} : {borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>{name}</Typography>
        </Grid>
  )

  const ProcessPrice = ({name, isLast}) => (
    <Grid item align={'center'} className={classes.outerColumn} style={isLast? {borderRight: '0px', borderBottomRightRadius: '15px'} : {borderRight: '0px'}}>
          <Typography>{moneyFormatter.format(name)}</Typography>
        </Grid>
  )

  const Details1 = () => (
    <Grid container style={{ border: "1px solid #66C2EF", borderRadius: '15px 15px 15px 15px' }}>
      <Grid item xs={12} align="center" style={{ border: "1px solid #66C2EF", borderRadius: '15px 15px 0px 0px', paddingTop: 15, paddingBottom: 15 }}>
        <Typography>Resumen tratamiento</Typography>
      </Grid>
      <Grid container direction="column" item xs={3} align="left">
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>Titulo:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>Especialización</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Tipo de odontograma:</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" item xs={6}>
        <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}}>
          <Typography>{displayAppointmentData?.comment}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{specializationName}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.odontogramaType === 'adult' ? 'Adulto' : 'Niño'}</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" item xs align="right">
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
      </Grid>
      {/* procesos */}
      <Grid item xs={12} align="center" style={{ border: "1px solid #66C2EF", borderRadius: '0px 0px 0px 0px', paddingTop: 15, paddingBottom: 15 }}>
        <Typography>Procesos</Typography>
      </Grid>
      <Grid container direction="column" item xs={5} align="left">
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}} align="center">
          <Typography style={{marginLeft: 10}}>Procedimiento</Typography>
        </Grid>
        {displayAppointmentData?.processes.map((p, i, row) => <ProcessName name={p.name} isLast={i + 1 === row.length} />)}
      </Grid>
      <Grid container direction="column" item xs={4}>
      <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography>Piezas</Typography>
        </Grid>
        {displayAppointmentData?.processes.map((p, i, row) => <ProcessPiece name={p.pieces} />)}
      </Grid>
      <Grid container direction="column" item xs align="right">
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography style={{marginRight: 10}}>Precio</Typography>
        </Grid>
        {displayAppointmentData?.processes.map((p, i, row) => <ProcessPrice name={p.price} isLast={i + 1 === row.length} />)}
      </Grid>
    </Grid>
  )

  return (
    <Grid container spacing={1} style={{marginTop: 40}}>

      <Grid item xs={12}>
        <Details1 />
      </Grid>

    </Grid>
  )
}

export default ConfirmationForm
