import React, {useState} from "react";
import styles from "./styles";
import {Grid, Paper} from "@material-ui/core";
import PatientInfo from "./components/PatientInfo";
import PatientNotes from "./components/PatientNotes";
import PatientAppointments from "./components/PatientAppointments";
import {withStyles} from "@material-ui/core/styles";

const PatienteProfilePage = (props) => {
    const {classes} = props;
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Paper className={classes.root}>
            <Grid container justify="flex-start" spacing={3}>
                <Grid key={"patient_info"} item xs={12} sm={7}>
                    <PatientInfo
                        isEditing={isEditing}
                    />
                </Grid>
                <Grid key={"patient_notes"} item xs={12} sm={5}>
                    <PatientNotes

                    />
                </Grid>
                <Grid key={"patient_appointments"} item xs={12}>
                    <PatientAppointments

                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(PatienteProfilePage);
