import Pagination from '@material-ui/lab/Pagination';
import {Grid} from "@material-ui/core";

const TablePagination = ({count, rowsPerPage, currentPage, handleChangePage, handleChangeRowsPerPage}) => {

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