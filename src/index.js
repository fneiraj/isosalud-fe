import { render } from 'react-dom'
import routes from '../src/routes/routes'
import '@fontsource/roboto'

// Configurar backend mock
import { configureFakeBackend } from 'helpers'

configureFakeBackend()

render(routes, document.getElementById('root'))
