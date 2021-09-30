import {Box, Grid, makeStyles, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {DataMock} from "mock/data";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const styles = {};

const PatientInfoForm = ({
                   cancelChanges,
                   isNewAppointment,
                   textEditorProps,
                   pickerEditorPropsStartDate,
                   pickerEditorProps,
                   displayAppointmentData,
                   changeAppointment,
                   visibleChange,
                   commitAppointment,
                   applyChanges
               }) => {
/*
    const user = {
        firstName: 'Fernando', lastName: 'Neira', rut: '11.111.111-1',
        email: 'fe.neiraj@gmail.com', convenio: 'Isapre', sexo: 'masculino',
        dateOfBirth: '15/10/1999', phone: '+452222222', cellPhone: '+56999999999',
        address: 'Calle S/N #1234', commune: 'Temuco', city: 'Temuco'
    };
*/
    const userEmpty = {
        firstName: '', lastName: '', rut: '',
        email: '', convenio: '', sexo: '',
        dateOfBirth: '', phone: '', cellPhone: '',
        address: '', commune: '', city: ''
    }

    const [userData, setUserData] = useState(userEmpty)

    const classes = useStyles();

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [tabValue, setTabValue] = useState(0);

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: userData,
        validationSchema:
            Yup.object().shape({
                firstName: Yup.string().required('Debes ingresar el nombre de usuario.'),
                lastName: Yup.string().required('Debes ingresar la contraseña.'),
                rut: Yup.string().required('Debes ingresar el rut'),
                email: Yup.string().optional(),
                convenio: Yup.string().required('Debes ingresar el convenio'),
                sexo: Yup.string().required(),
                dateOfBirth: Yup.string().required(),
                phone: Yup.string().required(),
                cellPhone: Yup.string().required(),
                address: Yup.string().optional(),
                commune: Yup.string().optional(),
                city: Yup.string().optional()
            }),
        onSubmit(user, {setStatus, setSubmitting}) {
            setStatus();
            /*      userService.updatePatient(user)
                      .then(
                          user => {
                              console.log('actualizado')
                          },
                          error => {
                              setStatus(error);
                          }
                      );
                      */
            setUserData({...userData, ...user});
            setSubmitting(false);
        }
    });

    const formNewPatient = () => {
        return (
            <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
                <Grid item xs={12}>
                    <Grid container justify="flex-start" spacing={4}>
                        <Grid key="firstName" item>
                            <TextField
                                name="firstName"
                                id="firstName"
                                label="Nombres"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.errors.firstName && formik.touched.firstName}
                                helperText={formik.errors.firstName}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="lastName" item>
                            <TextField
                                name="lastName"
                                id="lastName"
                                label="Apellidos"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.errors.lastName && formik.touched.lastName}
                                helperText={formik.errors.lastName}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="rut" item>
                            <TextField
                                name="rut"
                                id="rut"
                                label="RUT"
                                value={formik.values.rut}
                                onChange={formik.handleChange}
                                error={formik.errors.rut && formik.touched.rut}
                                helperText={formik.errors.rut}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" spacing={4}>
                        <Grid key="email" item>
                            <TextField
                                name="email"
                                id="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email && formik.touched.email}
                                helperText={formik.errors.email}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="convenio" item>
                            <TextField
                                name="convenio"
                                id="convenio"
                                label="Convenio"
                                value={formik.values.convenio}
                                onChange={formik.handleChange}
                                error={formik.errors.convenio && formik.touched.convenio}
                                helperText={formik.errors.convenio}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="sexo" item>
                            <TextField
                                name="sexo"
                                id="sexo"
                                label="Sexo"
                                value={formik.values.sexo}
                                onChange={formik.handleChange}
                                error={formik.errors.sexo && formik.touched.sexo}
                                helperText={formik.errors.sexo}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" spacing={4}>
                        <Grid key="dateOfBirth" item>
                            <TextField
                                name="dateOfBirth"
                                id="dateOfBirth"
                                label="Fecha de nacimiento"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
                                helperText={formik.errors.dateOfBirth}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="phone" item>
                            <TextField
                                name="phone"
                                id="phone"
                                label="Telefono"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.errors.phone && formik.touched.phone}
                                helperText={formik.errors.phone}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="cellPhone" item>
                            <TextField
                                name="cellPhone"
                                id="cellPhone"
                                label="Celular"
                                value={formik.values.cellPhone}
                                onChange={formik.handleChange}
                                error={formik.errors.cellPhone && formik.touched.cellPhone}
                                helperText={formik.errors.cellPhone}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" spacing={4}>
                        <Grid key="address" item>
                            <TextField
                                name="address"
                                id="address"
                                label="Direccion"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.errors.address && formik.touched.address}
                                helperText={formik.errors.address}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="commune" item>
                            <TextField
                                name="commune"
                                id="commune"
                                label="Comuna"
                                value={formik.values.commune}
                                onChange={formik.handleChange}
                                error={formik.errors.commune && formik.touched.commune}
                                helperText={formik.errors.commune}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                        <Grid key="city" item>
                            <TextField
                                name="city"
                                id="city"
                                label="Ciudad"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.errors.city && formik.touched.city}
                                helperText={formik.errors.city}
                                fullWidth={true}
                                margin="normal"
                                InputLabelProps={{style: styles.labelEditText}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        )
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={(event, newValue) => {
                    setTabValue(newValue)
                }}
                className={classes.tabs}
            >
                <Tab label="Paciente registrado" {...a11yProps(0)} />
                <Tab label="Paciente nuevo" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0} style={{width: '80%'}}>
                <div>
                    <Autocomplete
                        id='patient'
                        label='Paciente'
                        value={displayAppointmentData['patient'] || undefined}
                        className={classes.textField}
                        autoHighlight
                        fullWidth={true}
                        options={DataMock.patients}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option.name)}
                        onChange={(event, newValue) => changeAppointment({
                            field: ['patient'], changes: newValue,
                        })}
                        renderInput={(params) => <TextField label='Nombre paciente' variant='outlined'{...params} />}
                        onError={() => null}
                    />
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Typography>Ingresa datos del paciente</Typography>
                {formNewPatient()}
            </TabPanel>
        </div>
    )
}

export default PatientInfoForm;