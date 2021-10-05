import React from 'react'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { authenticationService } from 'services'
import classNames from 'classnames'

const Menu = ({ classes, onDrawerToggle, location, listItems }) => {
  const CategoryHeader = ({ title }) => (
    <ListItem className={classes.categoryHeader} key={title}>
      <ListItemText
        classes={{
          primary: classes.categoryHeaderPrimary
        }}
      >
        {title}
      </ListItemText>
    </ListItem>
  )

  const MenuItem = ({ item }) => {
    const { id, link, icon } = item
    const isActive = (link === location.pathname) // || (link !== '/' && (location.pathname.includes(link)));

    return (
      <ListItem
        button
        component={Link}
        className={classNames(classes.item, isActive && classes.itemActiveItem)}
        to={link}
        onClick={onDrawerToggle}
      >
        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary
          }}
        >
          {id}
        </ListItemText>
      </ListItem>
    )
  }

  return listItems.map(({ id, children, roles }, i) => {
    const isForbidden = roles && roles.indexOf(authenticationService.currentUserValue?.role) === -1

    if (isForbidden) return null

    return (
      <React.Fragment key={id + i}>
        <CategoryHeader title={id} />
        {children.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        <Divider className={classes.divider} />
      </React.Fragment>
    )
  })
}

export default Menu
