export interface IAppState {
  persons: IPerson[],
  tasks: ITask[]
}

export interface IEntity {
  id: string;
}

export interface IPerson extends IEntity {
  name: string;
  color: string;
}

export interface ITask extends IEntity {
  name: string;
  description?: string;
}