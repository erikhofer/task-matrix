import { produce } from 'immer'
import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import * as actions from './actions'
import { AppState, Person, Tallies, TalliesId, Task } from './model'

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
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.personAdded):
        draft.push(action.payload)
        break
      case getType(actions.personUpdated):
        draft[draft.findIndex(person => person.id === action.payload.id)] =
          action.payload
        break
      case getType(actions.personDeleted):
        draft.splice(draft.findIndex(person => person.id === action.payload), 1)
        break
    }
  })
}

function taskReducer(
  state: ReadonlyArray<Task> = [],
  action: AppAction
): ReadonlyArray<Task> {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.taskAdded):
        draft.push(action.payload)
        break
      case getType(actions.taskUpdated):
        draft[draft.findIndex(task => task.id === action.payload.id)] =
          action.payload
        break
      case getType(actions.taskDeleted):
        draft.splice(draft.findIndex(task => task.id === action.payload), 1)
        break
    }
  })
}

function talliesReducer(
  state: ReadonlyArray<Tallies> = [],
  action: AppAction
): ReadonlyArray<Tallies> {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.talliesAdded):
        draft.push(action.payload)
        break
      case getType(actions.talliesUpdated):
        draft[findTalliesIndex(draft, action.payload.id)] = action.payload
        break
      case getType(actions.talliesDeleted):
        action.payload.forEach(id =>
          draft.splice(findTalliesIndex(draft, id), 1)
        )
        break
    }
    return
  })
}

function findTalliesIndex(tallies: Tallies[], id: TalliesId) {
  return tallies.findIndex(
    t => t.id.personId === id.personId && t.id.taskId === id.taskId
  )
}

function modeReducer(state: boolean = true, action: AppAction): boolean {
  if (action.type === getType(actions.modeToggle)) {
    return !state
  }
  return state
}
