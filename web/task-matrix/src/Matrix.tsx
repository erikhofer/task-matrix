import { Button, Tooltip } from 'antd'
import isDarkColor from 'is-dark-color'
import React from 'react'
import { Link } from 'react-router-dom'
import tallyMarks from 'tally-marks'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as actions from './actions'
import { AppState, Person, TalliesId, Task } from './model'
import ModeToggler from './ModeToggler'
import { AppAction } from './reducer'

interface Props extends AppState {
  dispatch: Dispatch<AppAction>
}

const mapStateToProps = (state: AppState) => ({ ...state })
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  dispatch
})

class Matrix extends React.Component<Props> {
  public render() {
    const { persons, tasks } = this.props
    return (
      <div className="Matrix">
        <table>
          <tr>
            <td>
              <ModeToggler />
            </td>
            {persons.map(this.renderPerson)}
            <td style={{ padding: '0 10px' }}>
              <Link to="/person/new">
                <Button>Add Person</Button>
              </Link>
            </td>
          </tr>
          {tasks.map(task => this.renderTask(task))}
          <tr>
            <td style={{ padding: '10px 0' }}>
              <Link to="/tast/new">
                <Button>Add Task</Button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    )
  }

  private onTallyClick(id: TalliesId) {
    this.props.dispatch(
      this.props.incrementMode
        ? actions.talliesIncrement(id)
        : actions.talliesDecrement(id)
    )
  }

  private renderTask(task: Task): JSX.Element {
    const { persons } = this.props
    return (
      <tr key={task.id}>
        <td>
          <Link to={'/task/' + task.id}>
            <div className="cell">
              <Tooltip
                title="Edit"
                placement="left"
                style={{ marginRight: '-10px' }}
              >
                {task.name}
              </Tooltip>
            </div>
          </Link>
        </td>
        {persons.map(person => this.renderTallyChart(task, person))}
      </tr>
    )
  }

  private renderTallyChart(task: Task, person: Person): JSX.Element {
    const tallies = this.props.tallies.find(
      t => t.id.personId === person.id && t.id.taskId === task.id
    )
    const onClick = () =>
      this.onTallyClick({
        personId: person.id,
        taskId: task.id
      })
    return (
      <td>
        <div className="cell" onClick={onClick}>
          {tallyMarks(tallies)}
        </div>
      </td>
    )
  }

  private renderPerson(person: Person): JSX.Element {
    const foregroundColor = isDarkColor(person.color) ? 'white' : 'black'
    return (
      <td key={person.id}>
        <Tooltip title="Edit">
          <Link to={'/person/' + person.id}>
            <div
              className="cell"
              style={{ backgroundColor: person.color, color: foregroundColor }}
            >
              {person.name}
            </div>
          </Link>
        </Tooltip>
      </td>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matrix)
