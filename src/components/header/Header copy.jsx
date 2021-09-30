import {useState} from "react"
import classNames from "classnames"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from "@material-ui/icons/MoreVert"
import {Menu, Toolbar, Tooltip} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import {authenticationService} from "services"
import {history} from "helpers"
import styles from "./styles"

const Header = ({handleChangeNavDrawer, classes, navDrawerOpen}) => {

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    let anchorEl = null;

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const logout = () => {
        authenticationService.logout();
        history.go(0);
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : null}
                aria-haspopup="true"
                onClick={logout}
                color="inherit"
            >
                <ExitToAppIcon/>
                <div style={{marginLeft: 5, fontSize: 16}}>{"Cerrar sesión"}</div>
            </IconButton>
        </Menu>
    );

    return (
        <div>
            <AppBar
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: navDrawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleChangeNavDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div className={classes.grow}/>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                        {renderMobileMenu}
                    </div>
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="Cerrar sesión">
                            <IconButton
                                aria-owns={isMenuOpen ? "material-appbar" : null}
                                aria-haspopup="true"
                                onClick={logout}
                                color="inherit"
                            >
                                <ExitToAppIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(Header)
