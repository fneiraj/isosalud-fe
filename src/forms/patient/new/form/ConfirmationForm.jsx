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
  preloadData
}) => {
  const classes = useStyles();

  const dateOfBirthParsed = (displayAppointmentData?.dateOfBirth instanceof Date) ? displayAppointmentData?.dateOfBirth : dateUtils.parse(displayAppointmentData?.dateOfBirth, 'yyyy-MM-dd')
  const dateOfBirthFormatted = dateUtils.format(dateOfBirthParsed, 'dd-MM-yyyy')


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
          <Typography style={{marginLeft: 10}}>Fecha de nacimiento:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Email:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Dirección:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Comuna:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Telefono:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Celular:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Genero:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Medio de contacto preferido:</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px', borderBottomLeftRadius: '0px'}}>
          <Typography style={{marginLeft: 10}}>Previsión:</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" item xs={6}>
        <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}}>
          <Typography>{`${displayAppointmentData?.firstName} ${displayAppointmentData?.lastName}`}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.rut}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{dateOfBirthFormatted}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.email}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.address}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.commune?.commune || displayAppointmentData?.commune}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.phone}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.cellphone}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.gender}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.preferredContactMeanName === 'cellphone' ? 'Llamada' : displayAppointmentData?.preferredContactMeanName === 'sms' ? 'SMS' : 'Correo électronico'}</Typography>
        </Grid>
        <Grid item className={classes.centerColumn}>
          <Typography>{displayAppointmentData?.prevision}</Typography>
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
        <Grid item className={classes.outerColumn} style={{borderLeft: '0px', borderBottomRightRadius: '0px'}}>
          <Typography style={{marginRight: 10}}>&nbsp;</Typography>
        </Grid>
      </Grid>
      {/* procesos */}
      <Grid item xs={12} align="center" style={{ border: "1px solid #66C2EF", borderRadius: '0px 0px 0px 0px', paddingTop: 15, paddingBottom: 15 }}>
        <Typography>Usuario</Typography>
      </Grid>
      <Grid container direction="column" item xs={4} align="left">
      <Grid item className={classes.outerColumn} style={{borderRight: '0px'}} align="center">
          <Typography style={{marginLeft: 10}}>Usuario</Typography>
        </Grid>
        <Grid item className={classes.outerColumn} style={{borderRight: '0px'}} align="center">
          <Typography style={{marginLeft: 10}}>{preloadData?.username || displayAppointmentData.username}</Typography>
        </Grid>
        
      </Grid>
      <Grid container direction="column" item xs={4}>
      <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography>Contraseña</Typography>
        </Grid>
        <Grid item className={classes.centerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography>{preloadData?.username || '*******'}</Typography>
        </Grid>
        
      </Grid>
      <Grid container direction="column" item xs align="right">
      <Grid item className={classes.outerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography style={{marginRight: 10}}>Rol</Typography>
        </Grid>

        <Grid item className={classes.outerColumn} style={{borderLeft: '0px'}} align="center">
          <Typography style={{marginRight: 10}}>{displayAppointmentData?.roleName === 'ROLE_ADMIN' ? 'Administrador' : displayAppointmentData?.roleName === 'ROLE_DENTIST' ? 'Dentista' : 'Paciente'}</Typography>
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
