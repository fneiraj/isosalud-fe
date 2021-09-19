import React from "react";
import {
    Backdrop,
    Divider,
    Grid,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {animated, useSpring} from 'react-spring/web.cjs';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import {DataMock} from '../../../../mock/data';
import ToothArches from "./tooth-arches/ToothArches";


const styles = (theme) => ({
    modal: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: 'auto',
        width: '95%',
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
    content: {
        padding: theme.spacing(1, 3, 2),
    },
    itemCentered: {
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    tableRow: {
        "&th, td": {
            borderBottom: 0
        },
        "&td, th": {
            borderBottom: 0
        }
    }
});


const Fade = React.forwardRef((props, ref) => {
    const {in: open, children, onEnter, onExited, ...other} = props;
    const style = useSpring({
        from: {opacity: 0},
        to: {opacity: open ? 1 : 0},
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const TreatmentDetails = (props) => {
    const {classes, open, handleClose} = props;

    const headerButtons = () => (
        <Grid container>
            <Grid item xs/>
            <Grid item style={{marginRight: 15}}>
                <Tooltip title="Imprimir" disableRipple={true}>
                    <IconButton onClick={() => {
                    }}>
                        <PrintIcon/>
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="Cerrar" disableRipple={true}>
                    <IconButton onClick={handleClose}>
                        <CancelIcon/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )

    const resumeContent = () => (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <span>Plan de tratamiento</span>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                        <span>#1</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{marginBottom: 20, marginTop: 10}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container style={{border: "1px solid grey", padding: 10}}>
                    <Grid item className={classes.itemCentered} xs={12}>
                        <span>Presupuesto total</span>
                    </Grid>
                    <Grid item className={classes.itemCentered} xs={12}>
                        <span>$629.000</span>
                    </Grid>
                    <Grid item style={{marginTop: 15}} xs={12}>
                        <Grid container>
                            <Grid item xs={5}>
                                <span>Realizado</span>
                            </Grid>
                            <Grid item xs={4}/>
                            <Grid item xs={3}>
                                <span>$22.000</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Abonado</span>
                            </Grid>
                            <Grid item xs={4}/>
                            <Grid item xs={3}>
                                <span>$72.000</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>Saldo por abonar</span>
                            </Grid>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <span>$557.000</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="column" style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <ArrowRightIcon/>
                            <span><b>Medico:</b> Fernando Neira</span>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <ArrowRightIcon/>
                            <span><b>Convenio:</b> Sin convenio salud</span>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <ArrowRightIcon/>
                            <span><b>Sucursal:</b> Clinica Dental ISOSALUD</span>
                        </div>
                    </Grid>
                </Grid>
                <Grid container style={{border: "1px solid grey", padding: 10}}>
                    <Grid item xs={12} style={{marginBottom: 5}}>
                        <span>Citas realizadas</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <ArrowRightIcon/>
                                    <span>Cita #03</span>
                                </div>
                                <div style={{marginLeft: 25}}>
                                    <span>21 de mayo de 2021 - 10:00 am</span>
                                    <br/>
                                    <span>Dr. Fernando Neira</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <ArrowRightIcon/>
                                    <span>Cita #02</span>
                                </div>
                                <div style={{marginLeft: 25}}>
                                    <span>20 de mayo de 2021 - 10:00 am</span>
                                    <br/>
                                    <span>Dr. Carlos Fuentes</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <ArrowRightIcon/>
                                    <span>Cita #01</span>
                                </div>
                                <div style={{marginLeft: 25}}>
                                    <span>10 de mayo de 2021 - 10:00 am</span>
                                    <br/>
                                    <span>Dr. Carlos Fuentes</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const pacientDataConten = () => (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs>
                        <span>Datos paciente</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{marginBottom: 20, marginTop: 10}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <span><b>Nombre:</b> Fernando Neira</span>
                        <br/>
                        <span><b>RUT:</b> 20.352.825-6</span>
                        <br/>
                        <span><b>Edad:</b> 21</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const detailsContent = () => (
        <TableContainer style={{borderBottom: "none"}}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Procedimiento clinico</TableCell>
                        <TableCell align="right" style={{width: 130}}>PIEZA</TableCell>
                        <TableCell align="right" style={{width: 130}}>PRECIO</TableCell>
                        <TableCell align="right" style={{width: 130}}>ESTADO PAGO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {DataMock.treatmentDetails().details.map(({id, title, piece, price, paymentStatus}) => (
                        <TableRow key={id} className={classes.tableRow}>
                            <TableCell align="left">{title}</TableCell>
                            <TableCell align="right">{piece}</TableCell>
                            <TableCell align="right">{price}</TableCell>
                            <TableCell align="right">{paymentStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    const odontograma = () => (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs>
                        <span>Odontograma</span>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{marginBottom: 20, marginTop: 10}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <ToothArches type="adult"/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Fade in={open}>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            {headerButtons()}
                        </Grid>
                    </Grid>
                    <div className={classes.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper className={classes.paper} style={{border: "1px solid grey"}}>
                                    {resumeContent()}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper} style={{border: "1px solid grey"}}>
                                            {pacientDataConten()}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper} style={{border: "1px solid grey"}}>
                                            {detailsContent()}
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper className={classes.paper} style={{border: "1px solid grey"}}>
                                            {odontograma()}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default withStyles(styles)(TreatmentDetails);