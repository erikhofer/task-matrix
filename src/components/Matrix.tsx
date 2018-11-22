import { Button, Icon, Popover, Tooltip } from 'antd'
import isDarkColor from 'is-dark-color'
import React from 'react'
import { Link } from 'react-router-dom'
import tallyMarks from 'tally-marks'

import { connect } from 'react-redux'
import { DispatchProps, mapDispatchToProps } from 'src/store'
import * as actions from '../store/actions'
import { AppState, Person, TalliesId, Task } from '../store/model'
import ModeToggler from './ModeToggler'

interface Props extends AppState, DispatchProps {}

const mapStateToProps = (state: AppState) => ({ ...state })

class Matrix extends React.Component<Props> {
  public render() {
    const { persons, tasks } = this.props
    const noItems = persons.length === 0 && tasks.length === 0
    return (
      <div className="Matrix">
        <table>
          <tbody>
            <tr>
              <td>
                <ModeToggler />
              </td>
              {persons.map(this.renderPerson)}
              <td
                style={{
                  padding: '0 10px',
                  textAlign: noItems ? 'right' : 'left'
                }}
              >
                <Link to="/person/new">
                  <Button>Add Person</Button>
                </Link>
              </td>
            </tr>
            {tasks.map(task => this.renderTask(task))}
            <tr>
              <td style={{ padding: '10px 0' }}>
                <Link to="/task/new">
                  <Button>Add Task</Button>
                </Link>
              </td>
              {this.renderInitialHint(noItems)}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  private renderInitialHint(noItems: boolean) {
    if (noItems) {
      return (
        <td>
          <div className="initial-hint">
            <Icon type="arrow-left" />
            <span> Start by adding something </span>
            <Icon type="arrow-up" />
          </div>
        </td>
      )
    }
    return null
  }

  private onTallyClick(id: TalliesId) {
    this.props.dispatch(
      actions.talliesChangeCount({
        diff: this.props.incrementMode ? 1 : -1,
        id
      })
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
              {this.renderDescription(task)}
            </div>
          </Link>
        </td>
        {persons.map(person => this.renderTallyChart(task, person))}
      </tr>
    )
  }

  private renderDescription(task: Task) {
    if (task.description) {
      return (
        <Popover
          content={task.description}
          title="Description"
          placement="right"
        >
          {' '}
          <Icon type="info-circle" theme="filled" />
        </Popover>
      )
    }
    return null
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
      <td key={task.id + person.id}>
        <div className="cell" onClick={onClick}>
          {tallies === undefined || tallies.count === 0
            ? '\u00A0'
            : tallyMarks(tallies.count)}
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
