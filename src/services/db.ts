import idb from 'idb'
import { v4 as generateId } from 'uuid'

import { EntityId, Person, Tallies, TalliesId, Task } from '../store/model'

const PERSONS = 'PERSONS'
const TASKS = 'TASKS'
const TALLIES = 'TALLIES'

const dbPromise = idb.open('task-matrix', 1, upgradeDB => {
  if (!upgradeDB.objectStoreNames.contains(PERSONS)) {
    upgradeDB.createObjectStore(PERSONS, { keyPath: 'id' })
  }
  if (!upgradeDB.objectStoreNames.contains(TASKS)) {
    upgradeDB.createObjectStore(TASKS, { keyPath: 'id' })
  }
  if (!upgradeDB.objectStoreNames.contains(TALLIES)) {
    upgradeDB.createObjectStore(TALLIES, {
      keyPath: ['id.personId', 'id.taskId']
    })
  }
})

export async function createPerson(person: Person): Promise<Person> {
  person = { ...person, id: generateId() }
  const db = await dbPromise
  const tx = db.transaction(PERSONS, 'readwrite')
  const store = tx.objectStore(PERSONS)
  store.add(person)
  await tx.complete
  return person
}

export async function getAllPersons(): Promise<Person[]> {
  const db = await dbPromise
  const tx = db.transaction(PERSONS, 'readonly')
  const store = tx.objectStore(PERSONS)
  return store.getAll()
}

export async function updatePerson(person: Person) {
  const db = await dbPromise
  const tx = db.transaction(PERSONS, 'readwrite')
  const store = tx.objectStore(PERSONS)
  store.put(person)
  await tx.complete
}

export async function deletePerson(id: EntityId) {
  const db = await dbPromise
  const tx = db.transaction(PERSONS, 'readwrite')
  const store = tx.objectStore(PERSONS)
  store.delete(id)
  await tx.complete
}

export async function createTask(task: Task): Promise<Task> {
  task = { ...task, id: generateId() }
  const db = await dbPromise
  const tx = db.transaction(TASKS, 'readwrite')
  const store = tx.objectStore(TASKS)
  store.add(task)
  await tx.complete
  return task
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await dbPromise
  const tx = db.transaction(TASKS, 'readonly')
  const store = tx.objectStore(TASKS)
  return store.getAll()
}

export async function updateTask(task: Task) {
  const db = await dbPromise
  const tx = db.transaction(TASKS, 'readwrite')
  const store = tx.objectStore(TASKS)
  store.put(task)
  await tx.complete
}

export async function deleteTask(id: EntityId) {
  const db = await dbPromise
  const tx = db.transaction(TASKS, 'readwrite')
  const store = tx.objectStore(TASKS)
  store.delete(id)
  await tx.complete
}

export async function createTallies(tallies: Tallies): Promise<Tallies> {
  const db = await dbPromise
  const tx = db.transaction(TALLIES, 'readwrite')
  const store = tx.objectStore(TALLIES)
  store.add(tallies)
  await tx.complete
  return tallies
}

export async function getAllTallies(): Promise<Tallies[]> {
  const db = await dbPromise
  const tx = db.transaction(TALLIES, 'readonly')
  const store = tx.objectStore(TALLIES)
  return store.getAll()
}

export async function updateTallies(tallies: Tallies) {
  const db = await dbPromise
  const tx = db.transaction(TALLIES, 'readwrite')
  const store = tx.objectStore(TALLIES)
  store.put(tallies)
  await tx.complete
}

export async function deleteTallies(id: TalliesId) {
  const db = await dbPromise
  const tx = db.transaction(TALLIES, 'readwrite')
  const store = tx.objectStore(TALLIES)
  store.delete([id.personId, id.taskId])
  await tx.complete
}
