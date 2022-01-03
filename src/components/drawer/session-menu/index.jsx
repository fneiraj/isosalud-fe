import React from 'react'
import { Button, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { authenticationService } from 'services'
import { history } from 'helpers'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import classNames from 'classnames'
import { useToasts } from 'react-toast-notifications'

const SessionMenu = ({ classes, onDrawerToggle, location }) => {
  const { addToast } = useToasts()
  const CategoryHeader = ({ title }) => (
    <ListItem className={classes.categoryHeader}>
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
    const { id: childId, link, icon, action } = item
    const isActive = (link === location.pathname) || (link !== '/' && (location.pathname.startsWith(link)))

    return (
      <ListItem
        key={childId}
        button
        component={Button}
        className={classNames(classes.item, isActive && classes.itemActiveItem)}
        to={link}
        onClick={() => {
          if (action) {
            action()
          } else if (onDrawerToggle) {
            onDrawerToggle()
          }
        }}
      >
        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary
          }}
        >
          {childId}
        </ListItemText>
      </ListItem>
    )
  }
  const logout = () => {
    authenticationService.logout()
    addToast('Sesión finalizada con éxito', { appearance: 'success', autoDismiss: true })
    history.replace('/')
  }

  const options = [{
    id: 'Menú de sesión',
    children: [
      {
        id: 'Mi perfil',
        link: '/mi-perfil',
        icon: <AccountBoxIcon />
      },
      {
        id: 'Cerrar sesión',
        action: logout,
        icon: <ExitToAppIcon />
      }
    ]
  }]

  return options.map(({ id, children }, i) => {
    return (
      <React.Fragment key={id}>
        <CategoryHeader title={id} />
        {children.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        <Divider className={classes.divider} />
      </React.Fragment>
    )
  })
}

export default SessionMenu
