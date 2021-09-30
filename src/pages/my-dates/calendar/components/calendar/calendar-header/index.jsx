import {Button, FormControl, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import IconClickable from "components/icon-clickable";
import classNames from "classnames";

const CalendarHeader = ({
                            classes,
                            handleAddNewAppointment,
                            calendarType,
                            setCalendarType,
                            onNavigate,
                            navigatorText
}) => {

    const CustomDateNavigator = () => (
        <Grid container>
            <Grid item xs={2}>
                <div className={classes.floatRight}>
                    <IconClickable
                        Icon={ArrowBackIosIcon}
                        onClick={() => onNavigate('back')}
                    />
                </div>
            </Grid>
            <Grid item xs={8}>
                <Typography className={classes.textCenter}>
                    {navigatorText}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconClickable
                    Icon={ArrowForwardIosIcon}
                    onClick={() => onNavigate('forward')}
                />
            </Grid>
        </Grid>
    )

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} sm={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNewAppointment}
                    className={classes.fullWidthOnSmDown}
                >
                    Agregar cita
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} className={classNames(classes.fullWidthOnSmDown, classes.marginTopOnSmDown)}>
                <CustomDateNavigator />
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl className={classNames(classes.floatRight, classes.fullWidthOnSmDown, classes.marginTopOnSmDown)}>
                    <Select
                        labelId="calendarType"
                        id="calendarType"
                        value={calendarType}
                        onChange={event => setCalendarType(event.target.value)}
                        variant={"outlined"}
                        autoWidth={true}
                        className={classes.calendarType}
                    >
                        <MenuItem value='Month'>Mes</MenuItem>
                        <MenuItem value='Week'>Semana</MenuItem>
                        <MenuItem value='Day'>Dia</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(CalendarHeader);