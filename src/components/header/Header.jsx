import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from "@material-ui/icons/MoreVert"
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom'
import styles from './styles';
import {getPageProps} from 'config/menus';
import {Helmet} from 'react-helmet-async';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';


const Header = (props) => {
    const {classes, location, onDrawerToggle} = props;
    const pageProps = getPageProps(location.pathname);

    const menuButton = () => (
        <Grid item>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon/>
            </IconButton>
        </Grid>
    )

    const toolbarTitle = () => (
        <Grid item xs>
            <Typography color="inherit" variant="h6" component="h1">
                {pageProps?.title}
            </Typography>
        </Grid>
    )

    const notifications = () => (
        <>
            <Grid item>
                <Tooltip title="Sin notificaciones">
                    <IconButton
                        aria-owns={null}
                        aria-haspopup="true"
                        onClick={() => {}}
                        color="inherit"
                    >
                        <NotificationsNoneIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )

    const moreBtnMobile = () => (
        <Grid item>
            <MoreIcon/>
        </Grid>
    )

    const renderTabs = () => {
        const currentTab = pageProps.tabs.findIndex(tab => (tab.link === props.match.path) || (tab.tabs && tab.tabs.find(subTab => subTab.link === props.match.path)))

        return (
            <Tabs value={currentTab} textColor="inherit" variant="scrollable" scrollButtons="auto">
                {pageProps.tabs.map(({title, link}) => (
                    <Tab key={title} textColor="inherit" label={title} component={Link}
                         to={link.replace(':id', props.match.params.id)}/>)
                )}
            </Tabs>
        )
    }

    const renderSubTabs = () => {
        const subTabsCurrentPage = pageProps?.tabs?.filter(tab => tab.tabs).filter(tab => tab.tabs).find(tab => {
            return tab.tabs.find(subTab => subTab.link === props.match.path)
        });

        const currentTab = subTabsCurrentPage?.tabs.findIndex(tab => tab.link === props.match.path);

        return subTabsCurrentPage ? (
            <div style={{margin: 0, background: '#fff'}}>
                <Tabs value={currentTab} textColor="primary" TabIndicatorProps={{style: {background: '#009BE5'}}}>
                    {subTabsCurrentPage.tabs.map(({title, link}) => (
                        <Tab key={title} textColor="inherit" label={title} component={Link}
                             to={link.replace(':id', props.match.params.id)}/>)
                    )
                    }
                </Tabs>
            </div>
        ) : null;
    }

    return (
        <>
            <Helmet>
                <title>{`${pageProps?.title} | ISOSALUD`}</title>
            </Helmet>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">

                        <Hidden smUp>
                            {menuButton()}
                        </Hidden>

                        {toolbarTitle()}

                        <Grid item xs/>

                        <Hidden xsDown>
                            {notifications()}
                        </Hidden>

                        <Hidden smUp>
                            {moreBtnMobile()}
                        </Hidden>

                    </Grid>
                </Toolbar>
                {pageProps?.tabs && renderTabs()}
                {renderSubTabs()}
            </AppBar>

        </>
    );
}

export default withRouter(withStyles(styles)(Header));