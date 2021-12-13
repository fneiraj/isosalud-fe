/* eslint-disable */
import { Grid, Paper, Typography } from "@material-ui/core"

const PatientsResume = ({data}) => {

    console.log({data})

    const RenderData = ({title, total, currentMonth, previousMonth}) => {
        
        console.log({title, total, currentMonth, previousMonth})

        const percent = (currentMonth * 100) / previousMonth 

        return (
        <Grid container spacing={4}>
            <Grid item xs={2}>
                <Typography variant='h4'>{total}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{color: '#66BB6A', fontWeight: 1000}}>^ {percent}% (dif. mes pasado)</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )}

    return (
        <Grid container component={Paper} spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    Pacientes
                </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop: 15}}>
                <RenderData {...data} />
            </Grid>
        </Grid>
    )
}

export default PatientsResume