import { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TablePagination from 'components/data-page/table-pagination'
import Paper from '@material-ui/core/Paper'
import styles from './styles'
import HeaderData from 'components/data-page/header'
import TableHeader from 'components/data-page/table-header'
import TableData from './components/table-data'
import useToggle from 'hooks/useToggle'
import { inventoryService } from 'services/inventory/InventoryService'
import FormNewProduct from 'pages/inventory/components/FormNewProduct'
import { useToasts } from 'react-toast-notifications'

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'categoria', numeric: false, disablePadding: false, label: 'Categoria' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Precio' },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Cantidad' },
  { id: 'actions', numeric: false, disablePadding: false, disableSort: true, label: 'Acciones' }
]

const moneyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP'

  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const InventoryPage = ({ classes }) => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isNewProductFormVisible, toggleNewProductFormVisible] = useToggle(false)
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentData, setCurrentData] = useState([])
  const [selected, setSelected] = useState([])
  const [currentProductEditing, setCurrentProductEditing] = useState(undefined)
  const { addToast } = useToasts()

  useEffect(() => {
    inventoryService.getAll()
      .then(res => {
        setData(res.data.data)
        setCurrentData(res.data.data)
      })
      .catch(error => console.error(error))
  }, [])

  const handleRequestSort = (event, property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleChangePage = (event, value) => setPage(value)

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value)

  const findNameOrRut = (inventory, value) => {
    return inventory.name.toLowerCase().includes(value.toLowerCase()) || inventory.productType?.name?.toLowerCase().includes(value.toLowerCase())
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
    setPage(1)
    if (event.target.value) {
      setCurrentData(data.filter(p => findNameOrRut(p, event.target.value)))
    } else {
      setCurrentData(data)
    }
  }

  const onCreateCallback = (product) => {
    inventoryService.create(product)
      .then(response => {
        setData(prev => [...prev, response.data])
        setCurrentData([...data, product])
        toggleNewProductFormVisible()
        addToast('Producto agregado correctamente', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onUpdateCallback = (product) => {
    inventoryService.update(product)
      .then(response => {
        setData(prev => {
          const newData = [...prev.filter(p => p.id !== response.data.id), response.data]
          setCurrentData(newData)
          return newData
        })
        toggleNewProductFormVisible()
        addToast('Producto modificado correctamente', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const plusOneHandler = (id) => {
    console.log(data.filter(p => p.id !== id))

    inventoryService
      .updateQuantity({ id: id, action: 'plus' })
      .then(response => {
        setData(prev => {
          const newData = [...prev.filter(p => p.id !== id), { ...response.data }]
          setCurrentData(newData)
          return newData
        })
        addToast('Stock modificado correctamente', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        addToast('Error al actualizar Stock', { appearance: 'error', autoDismiss: true })
        console.log(error)
      })
  }

  const minusOneHandler = (id) => {
    if (data.find(p => p.id === id).quantity === 0) {
      addToast('No puedes tener un stock negativo', { appearance: 'warning', autoDismiss: true })
      return
    }

    inventoryService
      .updateQuantity({ id: id, action: 'minus' })
      .then(response => {
        setData(prev => {
          const newData = [...prev.filter(p => p.id !== id), { ...response.data }]
          setCurrentData(newData)
          return newData
        })
        addToast('Stock modificado correctamente', { appearance: 'success', autoDismiss: true })
      })
      .catch(error => {
        addToast('Error al actualizar Stock', { appearance: 'error', autoDismiss: true })
        console.log(error)
      })
  }

  const editHandler = (id) => {
    const product = data.find(p => p.id === id)
    setCurrentProductEditing({ ...product, productTypeId: product.productType.id })
    toggleNewProductFormVisible()
  }

  return (
    <>
      <Paper className={classes.root}>

        <HeaderData
          searchText={searchText}
          handleSearch={handleSearch}
          placeholderSearchInput='Buscar producto por Nombre o tipo...'
          enableRefreshData={false}
          enableButtonNewData
          handleOnClickNewData={toggleNewProductFormVisible}
          newDataText='Agregar producto'
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='Inventario'>

            <TableHeader
              enableSelectAll={false}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rows={rows}
              numSelected={selected.length}
              rowCount={currentData.length}
            />

            <TableData
              enableSelect={false}
              currentData={currentData}
              orderBy={orderBy}
              order={order}
              page={page - 1}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
              moneyFormatter={moneyFormatter}
              plusOneHandler={plusOneHandler}
              minusOneHandler={minusOneHandler}
              editHandler={editHandler}
            />

          </Table>
        </div>

        <TablePagination
          count={currentData.length}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <FormNewProduct
        key={'form-new-product-' + isNewProductFormVisible}
        visible={isNewProductFormVisible}
        toggleVisible={toggleNewProductFormVisible}
        onCreateCallback={onCreateCallback}
        onUpdateCallback={onUpdateCallback}
        currentProductEditing={currentProductEditing}
        setCurrentProductEditing={setCurrentProductEditing}
      />
    </>
  )
}

export default withStyles(styles)(InventoryPage)
