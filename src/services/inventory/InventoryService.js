import { HttpClient } from 'services/http-client'

export const inventoryService = {
  getAll,
  getProductTypes,
  getById,
  create,
  update,
  updateQuantity
}

function getProductTypes () {
  return HttpClient.get('/inventory/product-types')
}

function getAll () {
  return HttpClient.get('/inventory')
}

function getById (id) {
  return HttpClient.get(`/inventory/search?id=${id}`)
}

function create ({ productTypeId, name, description = null, price, quantity }) {
  const payload = {
    productType: {
      id: productTypeId
    },
    name: name,
    description: description !== '' ? description : null,
    price: price,
    quantity: quantity
  }

  return HttpClient.post('/inventory', payload)
}

function update ({ id, productTypeId = null, name, description = null, price = null, quantity = null }) {
  const payload = {
    productType: {
      id: productTypeId
    },
    name: name,
    description: (!description || description.length === 0) ? null : description,
    price: price,
    quantity: quantity
  }

  return HttpClient.post(`/inventory/update?id=${id}`, payload)
}

function updateQuantity ({ id, action, ammount = null }) {
  const ammountQs = ammount ? `&ammount=${ammount}` : ''
  return HttpClient.post(`/inventory/update-quantity?id=${id}&action=${action}${ammountQs}`)
}
