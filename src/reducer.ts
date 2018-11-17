import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import * as actions from './actions'
import { AppState, Person, Tallies, Task } from './model'

export type AppAction = ActionType<typeof actions>

export const reducer = combineReducers<AppState, AppAction>({
  incrementMode: modeReducer,
  persons: personReducer,
  tallies: talliesReducer,
  tasks: taskReducer
})

function personReducer(
  state: ReadonlyArray<Person> = [],
  action: AppAction
): ReadonlyArray<Person> {
  return state
}

function taskReducer(
  state: ReadonlyArray<Task> = [],
  action: AppAction
): ReadonlyArray<Task> {
  return state
}

function talliesReducer(
  state: ReadonlyArray<Tallies> = [],
  action: AppAction
): ReadonlyArray<Tallies> {
  return state
}

function modeReducer(state: boolean = true, action: AppAction): boolean {
  if (action.type === getType(actions.modeToggle)) {
    return !state
  }
  return state
}
