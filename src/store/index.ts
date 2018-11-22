import { Dispatch } from 'redux'
import { combineEpics } from 'redux-observable'
import { personAddEpic, personDeleteEpic, personUpdateEpic } from './epics'
import { AppAction } from './reducer'

export const appEpic = combineEpics(
  personAddEpic,
  personUpdateEpic,
  personDeleteEpic
)

export interface DispatchProps {
  dispatch: Dispatch<AppAction>
}

export const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  dispatch
})
