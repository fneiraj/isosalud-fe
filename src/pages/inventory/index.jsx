import {useState} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EnhancedTableHead from "../../components/datatables/EnhancedTableHead";
import EnhancedTableToolbar from "../../components/datatables/EnhancedTableToolbar";
import {AppBar, Grid, TextField, Toolbar, Tooltip} from "@material-ui/core";
import {DataMock} from '../../mock/data';

const rows = [
    {id: "code", numeric: false, disablePadding: true, label: "Codigo "},
    {id: "name", numeric: false, disablePadding: false, label: "Nombre"},
    {id: "quantity", numeric: true, disablePadding: false, label: "Cantidad"},
    {id: "availableQuantity", numeric: true, disablePadding: false, label: "Cantidad disponible"},
    {id: "price", numeric: true, disablePadding: false, label: "Precio"},
    {id: "actions", numeric: true, disablePadding: false, disableSort: true, label: "Acciones"}
];

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
};

const styles = theme => ({
    root: {
        width: "100%",
        //    marginTop: theme.spacing(3)
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    },
});

const InventoryPage = ({classes}) => {

    const [data, setData] = useState(DataMock.inventory);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [selected, setSelected] = useState([]);
    const [currentData, setCurrentData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const handleRequestSort = (event, property) => {
        const newOrderBy = property;
        let newOrder = "desc";

        if (orderBy === property && order === "desc") {
            newOrder = "asc";
        }

        setOrder(newOrder);
        setOrderBy(newOrderBy);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(currentData.map(n => n.id));
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        if (event.target.value) {
            setCurrentData(data.filter(p => p.code.toLowerCase().includes(event.target.value.toLowerCase()) || p.name.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setCurrentData(data);
        }
    }

    const handleAddPatient = () => {

    }

    const handleRefreshData = () => {
        setData(DataMock.inventory());
        setCurrentData(data);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    //const emptyRowsMoreFiveData = rowsPerPage - Math.min(rowsPerPage, currentData.length - page * rowsPerPage);
    //const emptyRows = currentData.length > 5 ? emptyRowsMoreFiveData : 0;

    return (
        <Paper className={classes.root}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit"/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Buscar por código o nombre"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                                value={searchText}
                                onChange={handleSearch}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.addUser}
                                    onClick={handleAddPatient}>
                                Agregar insumo
                            </Button>
                            <Tooltip title="Actualizar">
                                <IconButton onClick={handleRefreshData} style={{marginLeft: 15}}>
                                    <RefreshIcon className={classes.block} color="inherit"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <EnhancedTableToolbar tableTitle="Insumos" numSelected={selected.length}/>
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rows={rows}
                        rowCount={currentData.length}
                    />
                    <TableBody>
                        {stableSort(currentData, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                const isActualSelected = isSelected(n.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, n.id)}
                                        role="checkbox"
                                        aria-checked={isActualSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isActualSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isActualSelected}/>
                                        </TableCell>
                                        {/* <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.calories}</TableCell>
                      <TableCell align="right">{n.fat}</TableCell>
                      <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.protein}</TableCell> */}
                                        {/*<TableCell>{n.id}</TableCell>*/}
                                        <TableCell padding="none">{n.code}</TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell align="right">{n.quantity}</TableCell>
                                        <TableCell align="right">{n.avalaibleQuantity}</TableCell>
                                        <TableCell align="right">{n.price}</TableCell>
                                        <TableCell align="right">
                                            <Link className="button" to="#">
                                                <Tooltip title="Acciones">
                                                    <Button>
                                                        <MoreVertIcon/>
                                                    </Button>
                                                </Tooltip>
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {/*emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )*/}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 30, 50, 70, 90, 100]}
                component="div"
                count={currentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page"
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}


export default withStyles(styles)(InventoryPage);
