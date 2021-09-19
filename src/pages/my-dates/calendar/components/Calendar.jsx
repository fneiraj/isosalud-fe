import {useState} from "react";
import {Button, darken, FormControl, Grid, MenuItem, Paper, Select, Typography, withStyles} from "@material-ui/core";
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DayView,
    MonthView,
    Scheduler,
    Toolbar,
    WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {EditingState, ViewState} from "@devexpress/dx-react-scheduler";
import {fade, lighten} from "@material-ui/core/styles/colorManipulator";
import {connectProps} from "@devexpress/dx-react-core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AppointmentFormContainerBasic from "./FormNewAppointment";
import DeleteDialog from "./DeleteDialog";
import {format} from "date-fns";
import {DataMock} from "../../../../mock/data";

const getBorder = (theme) =>
    `1px solid ${
        theme.palette.type === "light"
            ? lighten(fade(theme.palette.divider, 1), 0.88)
            : darken(fade(theme.palette.divider, 1), 0.68)
    }`;

const styles = (theme) => ({
    cell: {
        color: "#78909C!important",
        position: "relative",
        userSelect: "none",
        verticalAlign: "top",
        padding: 0,
        height: 100,
        borderLeft: getBorder(theme),
        "&:first-child": {
            borderLeft: "none"
        },
        "&:last-child": {
            paddingRight: 0
        },
        "tr:last-child &": {
            borderBottom: "none"
        },
        "&:hover": {
            backgroundColor: "white"
        },
        "&:focus": {
            backgroundColor: fade(theme.palette.primary.main, 0.15),
            outline: 0
        }
    },
    content: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        alignItems: "center"
    },
    text: {
        padding: "0.5em",
        textAlign: "center"
    },
    sun: {
        color: "#FFEE58"
    },
    cloud: {
        color: "#90A4AE"
    },
    rain: {
        color: "#4FC3F7"
    },
    sunBack: {
        backgroundColor: "#FFFDE7"
    },
    cloudBack: {
        backgroundColor: "#ECEFF1"
    },
    rainBack: {
        backgroundColor: "#E1F5FE"
    },
    opacity: {
        opacity: "0.5"
    },
    appointment: {
        borderRadius: "10px",
        "&:hover": {
            opacity: 0.6
        }
    },
    apptContent: {
        "&>div>div": {
            whiteSpace: "normal !important",
            lineHeight: 1.2
        }
    },
    flexibleSpace: {
        flex: "none"
    },
    flexContainer: {
        display: "flex",
        alignItems: "center"
    },
    tooltipContent: {
        padding: theme.spacing(3, 1),
        paddingTop: 0,
        backgroundColor: theme.palette.background.paper,
        boxSizing: "border-box",
        width: "400px"
    },
    tooltipText: {
        ...theme.typography.body2,
        display: "inline-block"
    },
    title: {
        ...theme.typography.h6,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightBold,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    icon: {
        color: theme.palette.action.active,
        verticalAlign: "middle"
    },
    circle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        verticalAlign: "super"
    },
    textCenter: {
        textAlign: "center"
    },
    dateAndTitle: {
        lineHeight: 1.1
    },
    titleContainer: {
        paddingBottom: theme.spacing(2)
    },
    container: {
        paddingBottom: theme.spacing(1.5)
    },
    formControl: {
        minWidth: 60,
    },
    navigator: {
        margin: theme.spacing(1),
    }
});

const Calendar = ({classes}) => {

    const DayScaleCell = (props) => (
        <MonthView.DayScaleCell
            {...props}
            style={{textAlign: "center", textTransform: "uppercase", fontWeight: "bold"}}
        />
    );

    const Appointment = withStyles(styles, {
        name: "Appointment"
    })(({classes, ...restProps}) => (
        <Appointments.Appointment {...restProps} className={classes.appointment}/>
    ));

    const AppointmentContent = withStyles(styles, {
        name: "AppointmentContent"
    })(({classes, ...restProps}) => (
        <Appointments.AppointmentContent
            {...restProps}
            className={classes.apptContent}
        />
    ));


    const currentDate = new Date();
    const startDayHour = 8;
    const endDayHour = 19;

    const [calendarType, setCalendarType] = useState('Month');
    const [data, setData] = useState(DataMock.appointments);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [editingFormVisible, setEditingFormVisible] = useState(false);
    const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
    const [editingAppointment, setEditingAppointment] = useState(undefined);
    const [previousAppointment, setPreviousAppointment] = useState(undefined);
    const [addedAppointment, setAddedAppointment] = useState({});
    const [isNewAppointment, setIsNewAppointment] = useState(false);

    const toggleConfirmationVisible = () => {
        setConfirmationVisible(!confirmationVisible)
    }

    const commitChanges = ({added, changed, deleted}) => {
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, {id: startingAddedId, ...added}]);
        }
        if (changed) {
            setData(data.map(appointment => (
                changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment)));
        }
        if (deleted !== undefined) {
            setDeletedAppointmentId(deleted);
            toggleConfirmationVisible();
        }
        return {data, addedAppointment: {}};
    }

    const toggleEditingFormVisibility = () => {
        setEditingFormVisible(!editingFormVisible);
    }

    const appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
        const currentAppointment = data
                .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
            || addedAppointment;

        const cancelAppointment = () => {
            if (isNewAppointment) {
                setEditingAppointment(previousAppointment);
                setIsNewAppointment(false);
            }
        };

        return {
            visible: editingFormVisible,
            appointmentData: currentAppointment,
            commitChanges: commitChanges,
            visibleChange: toggleEditingFormVisibility,
            onEditingAppointmentChange: setEditingAppointment,
            cancelAppointment,
        };
    });

    const onAddedAppointmentChange = (addedAppointment) => {
        setAddedAppointment(addedAppointment);
        if (editingAppointment !== undefined) {
            setPreviousAppointment(editingAppointment);
        }
        setEditingAppointment(undefined);
        setIsNewAppointment(true);
    }

    const commitDeletedAppointment = () => {
        setData(data.filter(appointment => appointment.id !== deletedAppointmentId));
        setDeletedAppointmentId(null);
        toggleConfirmationVisible();
    }

    const handleAddNewAppointment = () => {
        setEditingFormVisible(true);
        setEditingAppointment(undefined);
        onAddedAppointmentChange({
            startDate: currentDate.setHours(startDayHour),
            endDate: currentDate.setHours(startDayHour + 1)
        })
    }

    const DateNavigatorComponent = ({onNavigate, navigatorText}) => (
        <Grid container style={{marginBottom: 15, marginTop: 15}}>
            <Grid item xs={2} className={classes.navigator}>
                <Button variant="contained" color="primary" onClick={() => {
                    handleAddNewAppointment()
                }}>
                    Agregar cita
                </Button>
            </Grid>
            <Grid item xs className={classes.navigator}/>
            <Grid item xs={1} className={classes.navigator}>
                <ArrowBackIosIcon onClick={() => onNavigate('back')} style={{cursor: 'pointer'}}/>
            </Grid>
            <Grid item xs={2} className={classes.navigator}>
                <Typography>{navigatorText}</Typography>
            </Grid>
            <Grid item xs={1} className={classes.navigator}>
                <ArrowForwardIosIcon onClick={() => onNavigate('forward')} style={{cursor: 'pointer'}}/>
            </Grid>
            <Grid item xs className={classes.navigator}/>
            <Grid item xs={1} className={classes.navigator}>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="calendarType"
                        id="calendarType"
                        value={calendarType}
                        onChange={event => setCalendarType(event.target.value)}
                        disableUnderline
                    >
                        <MenuItem value='Month'>Mes</MenuItem>
                        <MenuItem value='Week'>Semana</MenuItem>
                        <MenuItem value='Day'>Dia</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );


    return (
        <Paper>
            <Scheduler locale={"es-CL"} firstDayOfWeek={1} data={data}>
                <EditingState
                    onCommitChanges={commitChanges}
                    onEditingAppointmentChange={setEditingAppointment}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />

                <ViewState
                    defaultCurrentDate={format(currentDate, 'yyyy-MM-dd')}
                    currentViewName={calendarType}
                />

                <MonthView
                    dayScaleCellComponent={DayScaleCell}
                />

                <WeekView
                    startDayHour={startDayHour}
                    endDayHour={endDayHour}
                />

                <DayView
                    startDayHour={startDayHour}
                    endDayHour={endDayHour}
                />

                <Appointments
                    appointmentComponent={Appointment}
                    appointmentContentComponent={AppointmentContent}
                />

                <Toolbar/>

                <DateNavigator
                    rootComponent={DateNavigatorComponent}
                />

                <AppointmentTooltip
                    showCloseButton
                    showDeleteButton
                    showOpenButton
                />

                <AppointmentForm
                    overlayComponent={appointmentForm}
                    visible={editingFormVisible}
                    onVisibilityChange={toggleEditingFormVisibility}
                />

            </Scheduler>

            <DeleteDialog
                commitDeletedAppointment={commitDeletedAppointment}
                toggleConfirmationVisible={toggleConfirmationVisible}
                confirmationVisible={confirmationVisible}
            />

        </Paper>
    )

}

export default withStyles(styles)(Calendar);