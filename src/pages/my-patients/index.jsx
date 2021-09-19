import {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TablePagination from "../../components/data-page/table-pagination/table-pagination";
import Paper from "@material-ui/core/Paper";
import {DataMock} from '../../mock/data';
import FormNewPatient from "./components/FormNewPatient";
import styles from "./styles";
import HeaderData from "../../components/data-page/header/header-data";
import TableHeader from "../../components/data-page/table-header/table-header";
import TableData from "../../components/data-page/table-data/table-data";

const rows = [
    {id: "name", numeric: false, disablePadding: false, label: "Nombre"},
    {id: "treatments", numeric: false, disablePadding: false, label: "Nº Tratamientos"},
    {id: "nextMeeting", numeric: false, disablePadding: false, label: "Próxima cita"},
    {id: "phone", numeric: false, disablePadding: false, label: "Celular"},
    {id: "actions", numeric: false, disablePadding: false, disableSort: true, label: "Acciones"}
];


/*
const user = {
    firstName: 'Fernando', lastName: 'Neira', rut: '11.111.111-1',
    email: 'fe.neiraj@gmail.com', convenio: 'Isapre', sexo: 'masculino',
    dateOfBirth: '15/10/1999', phone: '+452222222', cellPhone: '+56999999999',
    address: 'Calle S/N #1234', commune: 'Temuco', city: 'Temuco'
};*/

const userEmpty = {
    firstName: '', lastName: '', rut: '',
    email: '', convenio: '', sexo: '',
    dateOfBirth: '', phone: '', cellPhone: '',
    address: '', commune: '', city: ''
}

const MyPatientsPage = ({classes}) => {

    const [data, setData] = useState(DataMock.patients);
    const [searchText, setSearchText] = useState("");
    const [userData, setUserData] = useState(userEmpty)
    const [newPatientFormVisible, setNewPatientFormVisible] = useState(false);

    const toggleNewPatientFormVisibility = () => {
        setNewPatientFormVisible(!newPatientFormVisible);
    }
/*
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
                  userService.updatePatient(user)
                      .then(
                          user => {
                              console.log('actualizado')
                          },
                          error => {
                              setStatus(error);
                          }
                      );

            setUserData({...userData, ...user});
            setSubmitting(false);
        }
    });
*/
    /*const formNewPatient = () => {
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

*/
    const handleRequestSort = (event, property) => {
        const newOrderBy = property;
        let newOrder = "desc";

        if (orderBy === property && order === "desc") {
            newOrder = "asc";
        }

        setOrder(newOrder);
        setOrderBy(newOrderBy);
    };


    const handleChangePage = (event, value) => setPage(value);

    const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);

    const findNameOrRut = (p, value) => {
        const valueWithoutPoint = value.replaceAll(".", "");
        const rutWithoutPoint = p.rut?.replaceAll(".", "");
        return p.name.toLowerCase().includes(value.toLowerCase()) || rutWithoutPoint?.includes(valueWithoutPoint);
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        setPage(1);
        if (event.target.value) {
            setCurrentData(data.filter(p => findNameOrRut(p, event.target.value)));
        } else {
            setCurrentData(data);
        }
    }
/*
    const handleAddPatient = () => {

    }
*/
    const handleRefreshData = () => {
        setData(DataMock.patients2());
        setCurrentData(data);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(currentData.map(n => n.id));
            return;
        }
        setSelected([]);
    };

    //const emptyRowsMoreFiveData = rowsPerPage - Math.min(rowsPerPage, currentData.length - page * rowsPerPage);
    //const emptyRows = currentData.length > 5 ? emptyRowsMoreFiveData : 0;

    const [orderBy, setOrderBy] = useState("id");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentData, setCurrentData] = useState(data);
    const [selected, setSelected] = useState([]);

    return (
        <>
            <Paper className={classes.root}>

                <HeaderData
                    searchText={searchText}
                    handleSearch={handleSearch}
                    placeholderSearchInput={"Buscar paciente por Nombre o RUT..."}
                    enableRefreshData={false}
                    handleRefreshData={handleRefreshData}
                    enableButtonNewData={true}
                    handleOnClickNewData={toggleNewPatientFormVisibility}
                    newDataText={"Agregar paciente"}
                />

                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="mis pacientes">

                        <TableHeader
                            enableSelectAll={false}
                            handleSelectAll={handleSelectAllClick}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rows={rows}
                            numSelected={selected.length}
                            rowCount={currentData.length}
                        />

                        <TableData
                            enableSelect={false}
                            currentData={currentData}
                            orderBy={orderBy}
                            order={order}
                            page={page - 1}
                            rowsPerPage={rowsPerPage}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Table>
                </div>
                <TablePagination
                    count={currentData.length}
                    currentPage={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <FormNewPatient/>
        </>
    );
}


export default withStyles(styles)(MyPatientsPage);
