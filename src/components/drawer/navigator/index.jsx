import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from 'components/drawer/menu'
import menus from 'config/menus';
import {withRouter} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import {authenticationService} from "services";
import SessionMenu from "components/drawer/session-menu";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";

const Navigator = (props) => {
    const {classes, onDrawerToggle, location, staticContext, ...other} = props;

    const currentUser = authenticationService.currentUserValue;


    return (
        <Drawer onClose={onDrawerToggle} variant="permanent" {...other} classes={{paper: classes.drawer}}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.itemHeader)}>
                    <Typography color="inherit" variant="h6" component="h1">
                        ISOSALUD
                    </Typography>
                </ListItem>
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon>
                        <Avatar src={currentUser?.avatar} alt="Imagen de perfil"/>
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        {`${currentUser?.firstName} ${currentUser?.lastName}`}
                    </ListItemText>
                </ListItem>
                <Menu
                    key="menuList"
                    onDrawerToggle={onDrawerToggle}
                    classes={classes}
                    location={location}
                    listItems={menus}
                />
                <SessionMenu
                    onDrawerToggle={onDrawerToggle}
                    classes={classes}
                    location={location}
                />
            </List>
        </Drawer>
    );
}

export default withRouter(withStyles(styles)(Navigator));