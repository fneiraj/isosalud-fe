import clsx from 'clsx';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from './menu/Menu'
import menus from '../../config/menus';
import {withRouter} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import {authenticationService} from "../../services";
import SessionMenu from "./session-menu/session-menu";
import Typography from "@material-ui/core/Typography";

const styles = (theme) =>
    createStyles({
        categoryHeader: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        categoryHeaderPrimary: {
            color: theme.palette.common.black,
        },
        item: {
            paddingTop: 1,
            paddingBottom: 1,
            borderLeft: '5px solid transparent',
            color: '#333333',
            '&:hover,&:focus': {
                backgroundColor: '#E5E5E5',
            },
        },
        itemHeader: {
            backgroundColor: '#009BE5',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            alignItems: 'center',
        },
        itemCategory: {
            backgroundColor: '#EDEDED',
            boxShadow: '0 -1px 0 #D6D6D6 inset',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            color: '#5B5B5B',
        },
        firebase: {
            fontSize: 18,
            color: theme.palette.common.white,
        },
        itemActiveItem: {
            color: '#009BE5',
            borderLeft: '5px solid #009EE3',
        },
        itemPrimary: {
            fontSize: 'inherit',
        },
        itemIcon: {
            minWidth: 'auto',
            marginRight: theme.spacing(2),
        },
        divider: {
            marginTop: theme.spacing(2),
            backgroundColor: "#D6D6D6"
        },
        drawer: {
            backgroundColor: '#EDEDED',
        }
    });

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