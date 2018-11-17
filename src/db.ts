import idb from 'idb'
import { v4 as generateId } from 'uuid'

import { Person } from './store/model'

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

export async function deletePerson(id: string) {
  const db = await dbPromise
  const tx = db.transaction(PERSONS, 'readwrite')
  const store = tx.objectStore(PERSONS)
  store.delete(id)
  await tx.complete
}
