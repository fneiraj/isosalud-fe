import React from "react";
import clsx from 'clsx';
import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services";

const Menu = ({classes, onDrawerToggle, location, listItems}) => {


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

    const menuItem = (childId, link, icon) => {
        const isActive = (link === location.pathname) || (link !== '/' && (location.pathname.startsWith(link)));

        return (
            <ListItem
                key={childId}
                button
                component={Link}
                className={clsx(classes.item, isActive && classes.itemActiveItem)}
                to={link}
                onClick={onDrawerToggle}
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

    return listItems.map(({id, children, roles}) => {
        const isForbidden = roles && roles.indexOf(authenticationService.currentUserValue?.role) === -1;

        if (isForbidden) return null;

        return (
            <React.Fragment key={id}>
                {categoryHeader(id)}
                {children.map(({id: childId, link, icon}) => (
                    menuItem(childId, link, icon)
                ))}
                <Divider className={classes.divider}/>
            </React.Fragment>
        )
    })
}

export default Menu;