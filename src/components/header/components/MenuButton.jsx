import {Grid, Hidden, IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const MenuButton = (onDrawerToggle, className) => (
    <Hidden smUp>
        <Grid item>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                className={className}
            >
                <MenuIcon/>
            </IconButton>
        </Grid>
    </Hidden>
)

export default MenuButton;