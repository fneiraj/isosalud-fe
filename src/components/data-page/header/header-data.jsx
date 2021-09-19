import {AppBar, Grid, TextField, Toolbar, Tooltip} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import PropTypes from "prop-types";

const HeaderData = ({
                        classes,
                        searchText,
                        handleSearch,
                        placeholderSearchInput,
                        enableRefreshData,
                        handleRefreshData,
                        enableButtonNewData,
                        handleOnClickNewData,
                        newDataText
                    }) => {

    return (
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon className={classes.block} color="inherit"/>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder={placeholderSearchInput}
                            InputProps={{
                                disableUnderline: true,
                                className: classes.searchInput,
                            }}
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item>
                        {enableButtonNewData && <Button variant="contained" color="primary" className={classes.addUser}
                                onClick={handleOnClickNewData}>
                            {newDataText}
                        </Button>
                        }
                        {enableRefreshData && <Tooltip title="Actualizar">
                            <IconButton onClick={handleRefreshData} style={{marginLeft: 15}}>
                                <RefreshIcon className={classes.block} color="inherit"/>
                            </IconButton>
                        </Tooltip>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

HeaderData.propTypes = {
    classes: PropTypes.object.isRequired,
    searchText: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    placeholderSearchInput: PropTypes.string.isRequired,
    enableRefreshData: PropTypes.bool.isRequired,
    handleRefreshData: PropTypes.func,
    enableButtonNewData: PropTypes.bool.isRequired,
    handleOnClickNewData: PropTypes.func,
    newDataText: PropTypes.string
};

export default withStyles(styles)(HeaderData);