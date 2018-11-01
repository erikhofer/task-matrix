export interface State {
  persons: Person[],
  tasks: Task[]
}

export interface Entity {
  id: String;
}

export interface Person extends Entity {
  name: String;
}

export interface Task extends Entity {
  name: String;
}