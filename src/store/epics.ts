import { Epic } from 'redux-observable'
import { filter, tap } from 'rxjs/operators'
import { ActionType, getType, isActionOf } from 'typesafe-actions'
import { Services } from '../services'
// import * as actions from './actions'
import { personAdd, taskAdd } from './actions'
import { AppState } from './model'
import { AppAction } from './reducer'

// const addTodoToast: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
//   action$.pipe(
//     filter(isActionOf(add)),
//     tap(action => { // here action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
//       toastService.success(...);
//     })

export type AppEpic = Epic<AppAction, AppAction, AppState, Services>

export const personAddEpic: AppEpic = (action$, state$, { db }) =>
  action$.pipe(
    filter(isActionOf(personAdd)),
    tap(action => {
      console.log(action)
    })
  )

export const taskAddEpic: AppEpic = (action$, state$, { db }) =>
  action$.pipe(
    filter(isActionOf(taskAdd)),
    tap(action => {
      console.log(action)
    })
  )
