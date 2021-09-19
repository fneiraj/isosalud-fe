import React from "react";
import clsx from 'clsx';
import {Button, Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services";
import {history} from "../../../helpers";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SessionMenu = ({classes, onDrawerToggle, location}) => {

    const categoryHeader = (id) => (
        <ListItem className={classes.categoryHeader}>
            <ListItemText
                classes={{
                    primary: classes.categoryHeaderPrimary,
                }}
            >
                {id}
            </ListItemText>
        </ListItem>
    )

    const menuItem = ({id: childId, link, icon, action}) => {
        const isActive = (link === location.pathname) || (link !== '/' && (location.pathname.startsWith(link)));

        return (
            <ListItem
                key={childId}
                button
                component={ action ? Button : Link}
                className={clsx(classes.item, isActive && classes.itemActiveItem)}
                to={link}
                onClick={() => {
                    if (action) {
                        action();
                    }else if(onDrawerToggle) {
                        onDrawerToggle()
                    }
                }}
            >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classes.itemPrimary,
                    }}
                >
                    {childId}
                </ListItemText>
            </ListItem>
        )
    }
    const logout = () => {
        authenticationService.logout();
        history.go(0);
    }

    const options = [{
        id: "Menú de sesión",
        children: [
            {
                id: "Mi perfil",
                link: '/mi-perfil',
                icon: <AccountBoxIcon />
            },
            {
                id: "Cerrar sesión",
                action: logout,
                icon: <ExitToAppIcon />
            },
        ]
    }]


    return options.map(({id, children}) => {

        return (
            <React.Fragment key={id}>
                {categoryHeader(id)}
                {children.map((c) => (menuItem(c)))}
                <Divider className={classes.divider}/>
            </React.Fragment>
        )
    })
}

export default SessionMenu;