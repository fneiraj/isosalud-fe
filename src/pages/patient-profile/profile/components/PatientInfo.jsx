import {Avatar, Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import React from "react";
import styles from "../styles";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        fontSize: theme.spacing(10)
    },
    bold: {
        fontWeight: 500
    }
}));


const PatientInfo = ({isEditing, onContactClick}) => {
    const classes = useStyles();

    const userInfo = {
        name: "Fernando Neira",
        avatarUrl: "",
        email: "fe.neiraj@gmail.com",
        rut: "20.352.825-6",
        convenio: "Isapre",
        gender: "Masculino",
        birthday: "15/10/1999",
        phone: "452212717",
        cellphone: "976188098",
        address: "Calle S/N #1234",
        commune: "Temuco",
        city: "Temuco",
        status: "Activo",
        registerDate: "01/01/2021"
    }

    const appointmentInfo = {
        past: 5,
        upcoming: 4
    }

    const BasicInfo = () => (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item xs={12}>
                <Avatar
                    className={classes.avatar}
                    alt={userInfo.name}
                    src={userInfo.avatarUrl}
                />
            </Grid>
            <Grid item xs={12} style={{marginTop: 5}}>
                <Typography className={classes.bold}>
                    {userInfo.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {userInfo.rut}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {userInfo.email}
                </Typography>
            </Grid>
        </Grid>
    )

    const AppointmentsInfo = () => (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item xs={12} style={{marginTop: 15}}>
                <Typography className={classes.bold}>
                    Citas
                </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop: 10}}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography
                            style={{ textAlign: "center", borderRight: '0.1em solid #DEDEDE', padding: '0.5em' }}
                        >
                            <span className={classes.bold}>{appointmentInfo.past}</span>
                            <br />
                            Realizadas
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            style={{ textAlign: "center", padding: '0.5em' }}
                        >
                            <span className={classes.bold}>{appointmentInfo.upcoming}</span>
                            <br />
                            Agendada
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const ContactPatient = () => (
        <Grid container>
            <Grid item style={{marginTop: 15}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onContactClick}
                >
                    Contactar
                </Button>
            </Grid>
        </Grid>
    )

    const textFieldProps = {
        disabled: !isEditing,
        fullWidth: true,
        margin: "normal",
        inputProps: {style: styles.labelEditText},
    }

    const PersonalInfo = () => (
        <Grid container>
            <Grid item xs={5}>
                <TextField label="Telefono" value={userInfo.phone} {...textFieldProps} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <TextField label="Direccion" value={userInfo.address} {...textFieldProps} />
            </Grid>

            <Grid item xs={5}>
                <TextField label="Comuna" value={userInfo.commune} {...textFieldProps} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <TextField label="Ciudad" value={userInfo.city} {...textFieldProps} />
            </Grid>

            <Grid item xs={5}>
                <TextField label="Nacimiento" value={userInfo.birthday} {...textFieldProps} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <TextField label="Sexo" value={userInfo.gender} {...textFieldProps} />
            </Grid>

            <Grid item xs={5}>
                <TextField label="Registro" value={userInfo.registerDate} {...textFieldProps} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <TextField label="Estado" value={userInfo.status} {...textFieldProps} />
            </Grid>
        </Grid>
    )

    return (
        <Card variant={"outlined"}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item md={5} xs={12}>
                        <Grid container alignItems="center" justify="center" direction="column">
                            <Grid item>
                                <BasicInfo />
                            </Grid>
                            <Grid item>
                                <AppointmentsInfo />
                            </Grid>
                            <Grid item>
                                <ContactPatient />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <Grid container alignItems="center" justify="center" direction="column">
                            <Grid item>
                                <PersonalInfo />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PatientInfo;