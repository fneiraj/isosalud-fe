import classNames from "classnames";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";

const TitleData = ({title, numSelected, classes}) => {

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} seleccionados
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        {title}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : null}

                {/*(
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}*/}

            </div>
        </Toolbar>
    );
};

TitleData.propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

export default withStyles(styles)(TitleData);
