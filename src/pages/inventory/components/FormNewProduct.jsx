import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Close } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { inventoryService } from 'services/inventory/InventoryService'

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
    marginTop: 70,
    marginBottom: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'scroll',
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
  }
})

const initProductData = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  productTypeId: ''
}

const FormNewProduct = ({ classes, visible, toggleVisible, onCreateCallback, onUpdateCallback, currentProductEditing, setCurrentProductEditing }) => {
  const [productTypes, setProductTypes] = useState([])

  useEffect(() => {
    inventoryService.getProductTypes()
      .then(response => setProductTypes(response.data.data))
      .catch(error => {
        console.error(error)
      })
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: currentProductEditing || initProductData,
    validationSchema:
      Yup.object().shape({
        name: Yup.string().required('Debes ingresar el nombre del producto'),
        description: Yup.string().nullable(),
        price: Yup.number('Debes ingresar el precio por unidad').positive('Debe ser un número positivo').required('Debes ingresar el precio por unidad.'),
        quantity: Yup.number('Debes ingresar una cantidad').positive('Debe ser un número positivo').required('Debes ingresar la cantidad'),
        productTypeId: Yup.number().positive().required('Debes seleccionar el tipo de producto')
      }),
    onSubmit (product, { setStatus, setSubmitting }) {
      console.log(product)
      setStatus()
      setSubmitting(false)
      if (currentProductEditing !== undefined) {
        onUpdateCallback(product)
      } else {
        onCreateCallback(product)
      }
    }
  })

  const formNewPatient = () => {
    return (
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={1}>
          <Grid key='name' item xs={12}>
            <TextField
              name='name'
              id='name'
              label='Nombre'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='description' item xs={12}>
            <TextField
              name='description'
              id='description'
              label='Descripción'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              margin='normal'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='productType' item xs={12}>
            <div className={classes.wrapper}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel>Tipo de producto</InputLabel>
                <Select
                  name='productTypeId'
                  id='productTypeId'
                  label='Tipo de producto'
                  onChange={formik.handleChange}
                  error={formik.touched.productTypeId && formik.errors.productTypeId}
                  helperText={formik.touched.productTypeId && formik.errors.productTypeId}
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ style: styles.labelEditText }}
                  value={formik.values.productTypeId}
                >
                  {productTypes.map(box => <MenuItem key={box.id} value={box.id}>{box.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid key='price' item xs={12}>
            <TextField
              name='price'
              id='price'
              label='Precio por unidad'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && formik.errors.price}
              helperText={formik.touched.price && formik.errors.price}
              fullWidth
              margin='normal'
              type='tel'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
          <Grid key='quantity' item xs={12}>
            <TextField
              name='quantity'
              id='quantity'
              label='Cantidad'
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && formik.errors.quantity}
              helperText={formik.touched.quantity && formik.errors.quantity}
              fullWidth
              margin='normal'
              type='tel'
              InputLabelProps={{ style: styles.labelEditText }}
            />
          </Grid>
        </Grid>
      </form>
    )
  }

  return (
    <Modal
      open={visible}
      onClose={() => {
        toggleVisible()
        setCurrentProductEditing(undefined)
      }}
      className={classes.modal}
    >
      <Paper className={classes.content}>
        <div className={classes.header}>
          <Typography variant='h5'>
            Nuevo producto
            <IconButton
              className={classes.closeButton}
              onClick={() => {
                toggleVisible()
                setCurrentProductEditing(undefined)
              }}
            >
              <Close color='action' />
            </IconButton>
          </Typography>

        </div>
        <div>
          <div style={{ width: '100%', height: '100%' }}>
            {formNewPatient()}
          </div>

          <div style={{ bottom: 30, right: 15, position: 'absolute' }} className={classes.buttonGroup}>
            <Button
              onClick={() => {
                toggleVisible()
                setCurrentProductEditing(undefined)
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
              {currentProductEditing !== undefined ? 'Actualizar' : 'Agregar'}
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  )
}

export default withStyles(styles)(FormNewProduct)
