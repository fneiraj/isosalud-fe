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
  treatment: treatmentSelected
}) => {
  const classes = useStyles();
  const startDateParsed = dateUtils.parse(displayAppointmentData?.startDate, 'yyyy-MM-dd HH:mm')
  const endDateParsed = dateUtils.parse(displayAppointmentData?.endDate, 'yyyy-MM-dd HH:mm')

  let dateAppointmentFormatted = null
  let startHourFormatted = null
  let endHourFormatted = null
  try {
    dateAppointmentFormatted = dateUtils.format(startDateParsed || new Date(), 'EEEE dd \'de\' LLLL \'del\' yyyy')
    startHourFormatted = dateUtils.format(startDateParsed, 'HH:mm a')
    endHourFormatted = dateUtils.format(endDateParsed, 'HH:mm a')
  } catch (error) {
    console.error(error)
  }

  const patientFirstname = displayAppointmentData?.patient?.firstName !== undefined ? displayAppointmentData?.patient?.firstName : displayAppointmentData?.patient?.personInfo?.firstName
  const patientLastname = displayAppointmentData?.patient?.lastName !== undefined ? displayAppointmentData?.patient?.lastName : displayAppointmentData?.patient?.personInfo?.lastName
  const patientRut = displayAppointmentData?.patient?.rut !== undefined ? displayAppointmentData?.patient?.rut : displayAppointmentData?.patient?.personInfo?.rut
  const patientPrevision = displayAppointmentData?.patient?.personInfo?.prevision !== undefined ? displayAppointmentData?.patient?.personInfo?.prevision : displayAppointmentData?.patient?.personInfo?.prevision
  const patientCellphone = displayAppointmentData?.patient?.cellphone !== undefined ? displayAppointmentData?.patient?.cellphone : displayAppointmentData?.patient?.personInfo?.cellphone
  const patientAddress = displayAppointmentData?.patient?.personInfo?.addressInfo?.street !== undefined ? displayAppointmentData?.patient?.personInfo?.addressInfo?.street : displayAppointmentData?.patient?.personInfo?.addressInfo?.street
  const patientCommune = displayAppointmentData?.patient?.personInfo?.addressInfo?.commune !== undefined ? displayAppointmentData?.patient?.personInfo?.addressInfo?.commune : displayAppointmentData?.patient?.personInfo?.addressInfo?.commune
  
  const getBoxName = (id) => 'BOX-0'+id

  const box = displayAppointmentData?.box?.name !== undefined ? displayAppointmentData?.box?.name : getBoxName(displayAppointmentData?.box)
  const title = displayAppointmentData?.title !== undefined ? displayAppointmentData?.title : displayAppointmentData?.title
  const treatment = displayAppointmentData?.treatment?.comment !== undefined ? displayAppointmentData?.treatment?.comment : treatmentSelected.comment

  const Details1 = () => (
    <Grid container style={{ border: "1px solid #66C2EF", borderRadius: '15px 15px 15px 15px' }}>
      <Grid item xs={12} align="center" style={{ border: "1px solid #66C2EF", borderRadius: '15px 15px 0px 0px', paddingTop: 15, paddingBottom: 15 }}>
        <Typography>Resumen paciente</Typography>
      </Grid>
      <Grid container direction="column" item xs={3} align="left">
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>Nombre:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>RUT:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Dirección:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Comuna:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Celular:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Previsión:</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" item xs={6}>
        <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}}>
          <Typography>{`${patientFirstname} ${patientLastname}`}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{patientRut}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{patientAddress}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{patientCommune}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{patientCellphone}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{patientPrevision}</Typography>
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
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
      </Grid>
      {/* procesos */}
      <Grid item xs={12} align="center" style={{ border: "1px solid #66C2EF", borderRadius: '0px 0px 0px 0px', paddingTop: 15, paddingBottom: 15 }}>
        <Typography>Resumen cita</Typography>
      </Grid>
      <Grid container direction="column" item xs={3} align="left">
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>Fecha:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}}>
          <Typography style={{marginLeft: 10}}>Hora de inicio:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Hora de termino:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Box:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Titulo:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Tratamiento:</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" item xs={6}>
        <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}}>
          <Typography>{dateAppointmentFormatted}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{startHourFormatted}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{endHourFormatted}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{box}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{treatment || 'Sin tratamiento'}</Typography>
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
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
        </Grid>
    </Grid>
  )

  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>
      <Details1 />
      </Grid>

    </Grid>
  )
}

export default ConfirmationForm
