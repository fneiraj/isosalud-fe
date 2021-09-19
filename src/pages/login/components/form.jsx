import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import Copyright from "../../../components/copyright/Copyright";

const LoginForm = ({classes, formik}) => (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <TextField
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nombre de usuario"
            autoComplete="off"
            autoFocus
        />
        <TextField
            name="password"
            id="password"
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            autoComplete="current-password"
        />
        <FormControlLabel
            name="rememberMe"
            id="rememberMe"
            checked={formik.values.rememberMe}
            value={formik.values.rememberMe}
            onChange={formik.handleChange}
            control={<Checkbox value="remember" color="primary"/>}
            label="Recordarme (durante el día)"
            className={classes.noSelect}
        />
        <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            className={classes.submit}
            type={"submit"}
        >
            Ingresar

        </Button>
        <Box mt={5}>
            <Copyright/>
        </Box>
    </form>
)

export default LoginForm;