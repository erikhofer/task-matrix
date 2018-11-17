export interface AppState {
  readonly persons: ReadonlyArray<Person>
  readonly tasks: ReadonlyArray<Task>
  readonly tallies: ReadonlyArray<Tallies>
  readonly incrementMode: boolean
}

export interface Entity<T> {
  readonly id: T
}

export interface Person extends Entity<string> {
  readonly name: string
  readonly color: string
}

export interface Task extends Entity<string> {
  readonly name: string
  readonly description?: string
}

export interface TalliesId {
  readonly taskId: string
  readonly personId: string
}

export interface Tallies extends Entity<TalliesId> {
  readonly count: number
}
