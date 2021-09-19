import {useState} from "react";
import {Button, IconButton, Modal, Paper, Step, StepLabel, Stepper, withStyles} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import 'date-fns';
import {Form1, Form2, Form3} from "./form";

const containerStyles = theme => ({
    container: {
        width: theme.spacing(68),
        padding: 0,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(1, 3, 2),
        width: '100%',
        height: '100%'
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    timePicker: {
        marginRight: theme.spacing(1),
        '&:last-child': {
            marginRight: 0,
        },
        width: '30%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
    modal: {
        margin: 'auto',
        overflow: 'hidden',
        width: '85%',
        height: '85%'
    },
});

const FormNewAppointment = (props) => {

    const {
        classes,
        visible,
        visibleChange,
        cancelAppointment,
        appointmentData,
        commitChanges
    } = props;

    const [appointmentChanges, setAppointmentChanges] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const changeAppointment = ({field, changes}) => {
        const nextChanges = {
            ...appointmentChanges,
            [field]: changes,
        };

        setAppointmentChanges(nextChanges);
    }

    const changeAppointments = ({f1, c1}, {f2, c2}) => {
        const nextChanges = {
            ...appointmentChanges,
            [f1]: c1,
            [f2]: c2,
        };

        setAppointmentChanges(nextChanges);
    }

    const commitAppointment = (type) => {
        const appointment = {
            ...appointmentData,
            ...appointmentChanges,
        };

        if (type === 'deleted') {
            commitChanges({[type]: appointment.id});
        } else if (type === 'changed') {
            commitChanges({[type]: {[appointment.id]: appointment}});
        } else {
            commitChanges({[type]: appointment});
        }

        setAppointmentChanges({});
    }

    const displayAppointmentData = {
        ...appointmentData,
        ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
        ? () => commitAppointment('added')
        : () => commitAppointment('changed');

    const textEditorProps = field => ({
        variant: 'outlined',
        onChange: ({target: change}) => changeAppointment({
            field: [field], changes: change.value,
        }),
        value: displayAppointmentData[field] || '',
        label: field[0].toUpperCase() + field.slice(1),
        className: classes.textField,
    });

    const pickerEditorProps = field => ({
        className: classes.picker,
        // keyboard: true,
        ampm: false,
        value: displayAppointmentData[field],
        onChange: date => changeAppointment({
            field: [field], changes: date ? date : new Date(displayAppointmentData[field]),
        }),
        minDate: new Date(),
        inputVariant: 'outlined',
        format: 'dd/MM/yyyy',
        onError: () => null,
    });

    const pickerEditorPropsStartDate = field => ({
        ...pickerEditorProps(field),
        onChange: date => {
            const newEndDate = isNewAppointment ? date : displayAppointmentData['endDate'];

            if (!isNewAppointment) {
                console.log("date: " + date)
                newEndDate.setFullYear(date.getFullYear())
                newEndDate.setDate(date.getDate());
                newEndDate.setMonth(date.getMonth());
            }

            changeAppointments(
                {f1: [field], c1: date ? date : new Date(displayAppointmentData[field])},
                {f2: ['endDate'], c2: newEndDate}
            )

        },
    });

    const cancelChanges = () => {
        setAppointmentChanges({});
        visibleChange();
        cancelAppointment();
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const steps = [
        {
            stepName: 'Cita',
            component: <Form1
                textEditorProps={textEditorProps}
                pickerEditorProps={pickerEditorProps}
                pickerEditorPropsStartDate={pickerEditorPropsStartDate}
                displayAppointmentData={displayAppointmentData}
                {...props}
            />
        },
        {
            stepName: 'Paciente',
            component: <Form2
                textEditorProps={textEditorProps}
                pickerEditorProps={pickerEditorProps}
                pickerEditorPropsStartDate={pickerEditorPropsStartDate}
                displayAppointmentData={displayAppointmentData}
                changeAppointment={changeAppointment}
                {...props}
            />
        },
        {
            stepName: 'Confirmación',
            component: <Form3
                textEditorProps={textEditorProps}
                pickerEditorProps={pickerEditorProps}
                pickerEditorPropsStartDate={pickerEditorPropsStartDate}
                displayAppointmentData={displayAppointmentData}
                {...props}
            />
        }
    ];

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={visible}
            onClose={visibleChange}
            className={classes.modal}
        >
            <Paper className={classes.content}>
                <div className={classes.header}>
                    <IconButton
                        className={classes.closeButton}
                        onClick={cancelChanges}
                    >
                        <Close color="action"/>
                    </IconButton>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label.stepName} {...stepProps}>
                                    <StepLabel {...labelProps}>{label.stepName}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
                <div>
                    <div style={{width: '100%', height: '100%'}}>
                        {steps[activeStep]?.component}
                    </div>

                    <div style={{bottom: 30, right: 15, position: 'absolute'}} className={classes.buttonGroup}>
                        {!isNewAppointment && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    commitAppointment('deleted');
                                }}
                            >
                                Borrar
                            </Button>
                        )}
                        {activeStep === 0 ?
                            <Button onClick={cancelChanges}>
                                Cancelar
                            </Button>
                            :
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Atras
                            </Button>
                        }
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (activeStep === steps.length - 1) {
                                    visibleChange();
                                    applyChanges();
                                } else {
                                    handleNext();
                                }
                            }}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? (isNewAppointment ? 'Crear' : 'Guardar') : 'Siguiente'}
                        </Button>
                    </div>
                </div>
            </Paper>
        </Modal>
    );
}

export default withStyles(containerStyles, {name: 'AppointmentFormContainer'})(FormNewAppointment);