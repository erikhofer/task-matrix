import { createStandardAction } from 'typesafe-actions'

import { EntityId, Person, TalliesId, Task } from './model'

export const personAdded = createStandardAction('person/ADDED')<Person>()
export const personUpdated = createStandardAction('person/UPDATED')<Person>()
export const personDeleted = createStandardAction('person/DELETED')<EntityId>()

export const taskAdded = createStandardAction('task/ADDED')<Task>()
export const taskUpdated = createStandardAction('task/UPDATED')<Task>()
export const taskDeleted = createStandardAction('task/DELETED')<EntityId>()

export const talliesIncrement = createStandardAction('tallies/INCREMENT')<
  TalliesId
>()
export const talliesDecrement = createStandardAction('tallies/DECREMENT')<
  TalliesId
>()

export const modeToggle = createStandardAction('mode/TsOGGLE')<void>()
