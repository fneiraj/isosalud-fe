import {Grid, Typography} from "@material-ui/core";

const Form3 = ({
                   classes,
                   cancelChanges,
                   isNewAppointment,
                   textEditorProps,
                   pickerEditorPropsStartDate,
                   pickerEditorProps,
                   displayAppointmentData,
                   changeAppointment,
                   visibleChange,
                   commitAppointment,
                   applyChanges
               }) => {


    return (
        <Grid container spacing={1}>

            <Grid item xs={12}>
                <hr/>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={"h4"} align={"center"}>Datos cita<br/></Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Titulo:</b> {'Cirugia'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Día:</b> {'18/06/2021'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Hora:</b> {'11:00 AM a 12:30 PM'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Comentario:</b> {'Cirugia dental para implantes dentales'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <hr/>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={"h4"} align={"center"}>Datos paciente<br/></Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Nombre:</b> {'Fernando Benjamín Neira Jerez'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>RUT:</b> {'20.352.825-6'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography><b>Correo:</b> {'fe.neiraj@gmail.com'}.</Typography>
            </Grid>

            <Grid item xs={12}>
                <hr/>
            </Grid>


        </Grid>
    )
}

export default Form3;