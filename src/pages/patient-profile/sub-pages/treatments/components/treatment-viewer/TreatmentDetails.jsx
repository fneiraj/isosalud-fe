/* eslint-disable */
import React, { useRef, useState } from 'react'
import {
  Backdrop,
  Grid,
  Modal,
  Paper,
  withStyles
} from '@material-ui/core'
import { animated, useSpring } from 'react-spring'
import Header from './Header'
import Resume from './Resume'
import PatientInfo from './PatientInfo'
import Details from './Details'
import OdontogramaViewer from './OdontogramaViewer'
import { useReactToPrint } from 'react-to-print'
import clsx from 'clsx'

const styles = (theme) => ({
  modal: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'auto',
    width: '95%'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5]
  },
  content: {
    padding: theme.spacing(1, 3, 2)
  },
  itemCentered: {
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  tableRow: {
    '&th, td': {
      borderBottom: 0
    },
    '&td, th': {
      borderBottom: 0
    }
  },
  parentContainer: {
    '@media print': {
      display: 'block',
    },
  }
})

const Fade = React.forwardRef((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

const TreatmentDetails = ({ classes, open, handleClose, treatment }) => {
  const [isPrint, setIsPrint] = useState(false)
  let printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `tratamiento.pdf`,
    onBeforeGetContent: () => {
      setIsPrint(true)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    onAfterPrint: () => {setIsPrint(false)}
  })

  return (
    <Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      className={classes.modal}
    >
      <Fade in={open}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Header handleClose={handleClose} handlePrint={handlePrint}/>
            </Grid>
          </Grid>
          <div className={clsx(classes.content)} ref={printRef}>
            <Grid container spacing={3}>
              {isPrint && <Grid item xs={12}>
                <img src={'http://cdn.isosalud.cl/logo.png'} width={'250px'} height={'150px'}/>
              </Grid>}
                <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.paper} style={{ border: '1px solid grey', height: '100%' }}>
                  <Resume
                    classes={classes}
                    treatment={treatment}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ border: '1px solid grey' }}>
                      <PatientInfo
                        treatment={treatment}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ border: '1px solid grey' }}>
                      <Details
                        classes={classes}
                        treatment={treatment}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} className={classes.parentContainer}>
                    <Paper className={classes.paper} style={{ border: '1px solid grey' }}>
                      <OdontogramaViewer
                        key={'odontograma-viewer-'+isPrint}
                        treatment={treatment}
                      />
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

export default withStyles(styles)(TreatmentDetails)
