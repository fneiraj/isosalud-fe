import {ThemeProvider} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {CssBaseline} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import FaceIcon from '@material-ui/icons/Face';
import Alert from "@material-ui/lab/Alert";
import defaultTheme from "../../../theme";

const FormWrapper = ({children, classes, status}) => (
    <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.formContainer}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingresar
                    </Typography>
                    {
                        status &&
                        <div className={classes.errorDiv}>
                            <Alert severity="error">{status}</Alert>
                        </div>
                    }
                    {children}
                </div>
            </Grid>
        </Grid>
    </ThemeProvider>
)

export default FormWrapper;