import { createStandardAction } from 'typesafe-actions'

import { Person, TalliesId, Task } from './model'

export const personAdded = createStandardAction('person/ADDED')<Person>()

export const taskAdded = createStandardAction('task/ADDED')<Task>()

export const talliesIncrement = createStandardAction('tallies/INCREMENT')<
  TalliesId
>()
export const talliesDecrement = createStandardAction('tallies/DECREMENT')<
  TalliesId
>()

export const modeToggle = createStandardAction('mode/TOGGLE')<void>()
