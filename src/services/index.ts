import * as db from './db'

export type DB = typeof db
export { db }

export interface Services {
  db: DB
}
