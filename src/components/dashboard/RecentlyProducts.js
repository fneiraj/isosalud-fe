import React, {useState} from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EventIcon from '@material-ui/icons/Event';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {cyan} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    subheader: {
        fontSize: 24,
        fontWeight: 300,
        backgroundColor: cyan[600],
        color: "white"
    }
};

const RecentlyProducts = ({classes, data}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const rightIconMenu = (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Ver detalles</MenuItem>
        </Menu>
    );

    const iconButtonElement = (
        <div>
            <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : null}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon color={"action"}/>
            </IconButton>
            {rightIconMenu}
        </div>
    );

    return (
        <Paper>
            <List
                subheader={
                    <ListSubheader classes={{root: classes.subheader}}>Proximas 5 citas</ListSubheader>
                }
            >
                {data.map((item, idx) => (
                    <ListItem key={idx}>
                        <Avatar style={{marginRight: "10px"}}>
                            <EventIcon/>
                        </Avatar>
                        <ListItemText
                            style={{whiteSpace: 'pre-line'}}
                            primary={item.title}
                            secondary={`Paciente: ${item.text}\nEspecialización: ${item.specialization}`}
                        />
                        <ListItemSecondaryAction>{iconButtonElement}</ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

RecentlyProducts.propTypes = {
    data: PropTypes.array,
    classes: PropTypes.object
};

export default withStyles(styles)(RecentlyProducts);
