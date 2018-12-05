import './style.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { db, Services } from './services'
import { appEpic } from './store'
import { AppState } from './store/model'
import { AppAction, reducer } from './store/reducer'
import { appSaga } from './store/sagas'
import { AppThunkDispatch, loadInitialState } from './store/thunks'

const services: Services = {
  db
}

const epicMiddleware = createEpicMiddleware<
  AppAction,
  AppAction,
  AppState,
  Services
>({
  dependencies: services
})

const sagaMiddleware = createSagaMiddleware()

const store: Store<AppState, AppAction> = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      epicMiddleware,
      thunk.withExtraArgument(services),
      sagaMiddleware
    )
  )
)

epicMiddleware.run(appEpic)
sagaMiddleware.run(appSaga)

const thunkDispatch: AppThunkDispatch = store.dispatch // to avoid this, type store properly with ThunkStore
thunkDispatch(loadInitialState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
