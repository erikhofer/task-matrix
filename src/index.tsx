import './style.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { db, Services } from './services'
import { appEpic } from './store'
import { AppState } from './store/model'
import { AppAction, reducer } from './store/reducer'

const epicMiddleware = createEpicMiddleware<
  AppAction,
  AppAction,
  AppState,
  Services
>({
  dependencies: {
    db
  }
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(appEpic)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
