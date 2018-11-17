import './style.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { reducer } from './store/reducer'

const store = createStore(reducer, devToolsEnhancer({}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()