import { message } from 'antd'
import { ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Services } from 'src/services'
import {
  personAdded,
  talliesAdded,
  talliesDeleted,
  taskAdded,
  taskDeleted,
  taskUpdated
} from './actions'
import { AppState, EntityId, Task } from './model'
import { AppAction } from './reducer'

// References:
// https://gist.github.com/seansean11/196c436988c1fdf4b22cde308c492fe5
// https://gist.github.com/milankorsos/ffb9d32755db0304545f92b11f0e4beb#gistcomment-2347730

export type AppThunk = ActionCreator<
  ThunkAction<void, AppState, Services, AppAction>
>

export type AppThunkDispatch = ThunkDispatch<AppState, Services, AppAction>

export const taskAdd: AppThunk = (task: Task) => async (
  dispatch,
  getState,
  { db }
) => {
  const newTask = await db.createTask(task)
  dispatch(taskAdded(newTask))
  message.success('Task added')
}

export const taskUpdate: AppThunk = (task: Task) => async (
  dispatch,
  getState,
  { db }
) => {
  await db.updateTask(task)
  dispatch(taskUpdated(task))
  message.success('Task saved')
}

export const taskDelete: AppThunk = (id: EntityId) => async (
  dispatch,
  getState,
  { db }
) => {
  await db.deleteTask(id)
  const talliesIdsOfDeletedTask = getState()
    .tallies.filter(t => t.id.taskId === id)
    .map(t => t.id)
  for (const talliesId of talliesIdsOfDeletedTask) {
    await db.deleteTallies(talliesId)
  }
  dispatch(talliesDeleted(talliesIdsOfDeletedTask))
  dispatch(taskDeleted(id))
  message.success('Task deleted')
}

export const loadInitialState: AppThunk = () => async (
  dispatch,
  getState,
  { db }
) => {
  const persons = await db.getAllPersons()
  const tasks = await db.getAllTasks()
  const tallies = await db.getAllTallies()
  persons.forEach(p => dispatch(personAdded(p)))
  tasks.forEach(t => dispatch(taskAdded(t)))
  tallies.forEach(t => dispatch(talliesAdded(t)))
}
