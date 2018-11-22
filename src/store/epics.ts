import { message } from 'antd'
import { Epic } from 'redux-observable'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { Services } from '../services'
import * as actions from './actions'
import { AppState } from './model'
import { AppAction } from './reducer'

export type AppEpic = Epic<AppAction, AppAction, AppState, Services>

export const personAddEpic: AppEpic = (action$, state$, { db }) =>
  action$.pipe(
    filter(isActionOf(actions.personAdd)),
    switchMap(action => db.createPerson(action.payload)),
    tap(() => message.success('Person added')),
    map(person => actions.personAdded(person))
  )

export const personUpdateEpic: AppEpic = (action$, state$, { db }) =>
  action$.pipe(
    filter(isActionOf(actions.personUpdate)),
    switchMap(async action => {
      await db.updatePerson(action.payload)
      return action.payload
    }),
    tap(() => message.success('Person updated')),
    map(person => actions.personUpdated(person))
  )

export const personDeleteEpic: AppEpic = (action$, state$, { db }) =>
  action$.pipe(
    filter(isActionOf(actions.personDelete)),
    switchMap(async action => {
      await db.deletePerson(action.payload)
      return action.payload
    }),
    tap(() => message.success('Person deleted')),
    map(id => actions.personDeleted(id))
  )
