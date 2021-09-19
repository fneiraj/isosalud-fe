import MuiTablePagination from "@material-ui/core/TablePagination";
import Pagination from '@material-ui/lab/Pagination';
import {Grid} from "@material-ui/core";

const TablePagination = ({count, rowsPerPage, currentPage, handleChangePage, handleChangeRowsPerPage}) => {

    const old = () => (
        <MuiTablePagination
            rowsPerPageOptions={[10, 30, 50, 70, 90, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            backIconButtonProps={{
                "aria-label": "Siguiente"
            }}
            nextIconButtonProps={{
                "aria-label": "Anterior"
            }}
            labelRowsPerPage="Registros por pagina"
            labelDisplayedRows={({from, to, count}) => ('pagina ' + from + '-' + to + ' de ' + (count !== -1 ? count : to))}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )

    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item xs={9} style={{marginTop: 10, marginBottom: 10}}>
                <Pagination
                    color={"primary"}
                    page={currentPage}
                    boundaryCount={2}
                    count={Math.ceil(count / rowsPerPage)}
                    onChange={handleChangePage}
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Grid>
    )
}

export default TablePagination;