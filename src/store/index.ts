import { combineEpics } from 'redux-observable'
import { AppEpic, personAddEpic, taskAddEpic } from './epics'

export const appEpic = combineEpics(personAddEpic, taskAddEpic)
