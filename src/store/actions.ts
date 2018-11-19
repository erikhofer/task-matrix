import { createStandardAction } from 'typesafe-actions'

import { EntityId, Person, Tallies, TalliesId, Task } from './model'

export const personAdded = createStandardAction('person/ADDED')<Person>()
export const personUpdated = createStandardAction('person/UPDATED')<Person>()
export const personDeleted = createStandardAction('person/DELETED')<EntityId>()
export const personAdd = createStandardAction('person/ADD')<Person>()
export const personUpdate = createStandardAction('person/UPDATE')<Person>()
export const personDelete = createStandardAction('person/DELETE')<EntityId>()

export const taskAdded = createStandardAction('task/ADDED')<Task>()
export const taskUpdated = createStandardAction('task/UPDATED')<Task>()
export const taskDeleted = createStandardAction('task/DELETED')<EntityId>()
export const taskAdd = createStandardAction('task/ADD')<Task>()
export const taskUpdate = createStandardAction('task/UPDATE')<Task>()
export const taskDelete = createStandardAction('task/DELETE')<EntityId>()

export const talliesAdded = createStandardAction('tallies/ADDED')<Tallies>()
export const talliesUpdated = createStandardAction('tallies/UPDATED')<Tallies>()
export const talliesDeleted = createStandardAction('tallies/DELETED')<
  TalliesId[]
>()
export const talliesIncrement = createStandardAction('tallies/INCREMENT')<
  TalliesId
>()
export const talliesDecrement = createStandardAction('tallies/DECREMENT')<
  TalliesId
>()

export const modeToggle = createStandardAction('mode/TOGGLE')<void>()
