import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {
  Grid,
  Modal,
  TextareaAutosize,
  Typography
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Close } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

const styles = theme => ({
  root: {
    width: '100%'
    //    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  modal: {
    marginTop: 270,
    marginBottom: 270,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    width: '50%'
  },
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(1, 3, 2),
    width: '100%',
    height: '100%'
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  errorDiv: {
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh'
  }
})

const initProductData = {
  comment: ''
}

const FormAddNote = ({
  classes,
  visible,
  toggleVisible,
  onCreateCallback
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initProductData,
    validationSchema:
      Yup.object().shape({
        comment: Yup.string().required('Debes ingresar el comentario')
      }),
    onSubmit (newNote, { setStatus, setSubmitting }) {
      setStatus()
      setSubmitting(false)
      onCreateCallback(newNote)
    }
  })

  const formNewNote = () => {
    return (
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={1}>
          <Grid key='comment' item xs={12}>
            <TextareaAutosize
              name='comment'
              id='comment'
              label='Comentario'
              value={formik.values.comment}
              onChange={formik.handleChange}
              error={formik.touched.comment && formik.errors.comment}
              helperText={formik.touched.comment && formik.errors.comment}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
              multiline
              minRows={10}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </form>
    )
  }

  return (
    <>
      <Modal
        open={visible}
        onClose={() => {
          toggleVisible()
        }}
        className={classes.modal}
      >
        <Paper className={classes.content}>
          <div className={classes.header}>
            <Typography variant='h5'>
              Añadir nota
              <IconButton
                className={classes.closeButton}
                onClick={() => {
                  toggleVisible()
                }}
              >
                <Close color='action' />
              </IconButton>
            </Typography>

          </div>
          <div>
            <div className={classes.errorDiv}>
              {formik.touched.comment && formik.errors.comment && <Alert severity='error'>{formik.touched.comment && formik.errors.comment}</Alert>}
            </div>
            <div style={{ width: '100%', height: '100%', marginTop: '5%' }}>
              {formNewNote()}
            </div>

            <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
              <Button
                onClick={() => {
                  toggleVisible()
                }}
                style={{ right: 30 }}
              >
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => formik.submitForm()}
                className={classes.button}
              >
                Agregar
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  )
}

export default withStyles(styles)(FormAddNote)
