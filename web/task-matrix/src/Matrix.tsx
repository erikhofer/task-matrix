import { Button, Tooltip } from 'antd'
import isDarkColor from 'is-dark-color'
import React from 'react'
import { Link } from 'react-router-dom'
import tallyMarks from 'tally-marks'

import { IAppState, IPerson, ITask } from './model'

export default class Matrix extends React.Component {
  public render() {
    const state: IAppState = {
      persons: [
        { id: '1', name: 'Justus', color: '#000000' },
        { id: '2', name: 'Peter', color: '#eeeeee' }
      ],
      tasks: [
        { id: '1', name: 'Moin', tallies: { '1': 4, '2': 6 } },
        { id: '2', name: 'Hallo', description: 'Das ist ein Task', tallies: {} }
      ]
    }
    const { persons, tasks } = state
    return (
      <div className="Matrix">
        <table>
          <tr>
            <td />
            {persons.map(this.renderPerson)}
            <td style={{ padding: '0 10px' }}>
              <Link to="/person/new">
                <Button>Add Person</Button>
              </Link>
            </td>
          </tr>
          {tasks.map(task => this.renderTask(task, persons))}
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

  private renderTask(task: ITask, persons: IPerson[]): JSX.Element {
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

  private renderTallyChart(task: ITask, person: IPerson): JSX.Element {
    return <td>{tallyMarks(task.tallies[person.id])}</td>
  }

  private renderPerson(person: IPerson): JSX.Element {
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
