import { SagaIterator } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { db } from 'src/services'
import { ActionType, getType } from 'typesafe-actions'
import { talliesAdded, talliesChangeCount, talliesUpdated } from './actions'
import { AppState, Tallies } from './model'

function* talliesChangeCountSaga(
  action: ActionType<typeof talliesChangeCount>
): SagaIterator {
  const { id, diff } = action.payload
  let tallies: Tallies = yield select<AppState>(state =>
    state.tallies.find(
      t => t.id.personId === id.personId && t.id.taskId === id.taskId
    )
  )
  if (tallies === undefined) {
    tallies = {
      count: diff < 0 ? 0 : diff,
      id
    }
    tallies = yield call(db.createTallies, tallies) // NO TYPE SAFETY :(
    yield put(talliesAdded(tallies))
  } else {
    tallies = {
      ...tallies,
      count: tallies.count < -diff ? 0 : tallies.count + diff
    }
    yield call(db.updateTallies, tallies)
    yield put(talliesUpdated(tallies))
  }
}

export function* appSaga(): Generator {
  yield takeEvery(getType(talliesChangeCount), talliesChangeCountSaga)
}
