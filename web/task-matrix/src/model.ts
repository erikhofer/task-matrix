export interface IState {
  persons: IPerson[],
  tasks: ITask[]
}

export interface IEntity {
  id: string;
}

export interface IPerson extends IEntity {
  name: string;
}

export interface ITask extends IEntity {
  name: string;
}