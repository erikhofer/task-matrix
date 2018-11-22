import React, { ChangeEvent } from 'react'

import { Input } from 'antd'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import {
  AppThunkDispatch,
  taskAdd,
  taskDelete,
  taskUpdate
} from 'src/store/thunks'
import { AppState, Task } from '../store/model'
import { EditEntity } from './EditEntity'

interface EditTaskRouteParams {
  id: string
}

interface EditTaskStateProps {
  allTasks: Task[]
}

interface EditTaskProps
  extends EditTaskStateProps,
    RouteComponentProps<EditTaskRouteParams> {
  dispatch: AppThunkDispatch
}

const mapStateToProps = (state: AppState) => ({
  allTasks: state.tasks
})

export const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
  dispatch
})

class EditTask extends React.Component<EditTaskProps, Task> {
  constructor(props: EditTaskProps) {
    super(props)

    const id: string = props.match.params.id

    if (id === 'new') {
      this.state = {
        id: null as any,
        name: ''
      }
    } else {
      this.state =
        this.props.allTasks.find(task => task.id === id) ||
        ((null as unknown) as Task) // load indefinitely
    }
  }
  public render() {
    return (
      <EditEntity
        entityName="task"
        onSave={this.onSave}
        onDelete={this.onDelete}
        loading={this.state == null}
        renderForm={this.renderForm}
        create={this.state != null && this.state.id == null}
      />
    )
  }

  private renderForm = () => {
    return (
      <div>
        <Input
          addonBefore="Name"
          style={{ maxWidth: '300px' }}
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <br />
        <br />
        <Input
          addonBefore="Description"
          style={{ maxWidth: '600px' }}
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
      </div>
    )
  }

  private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    })
  }

  private onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      description: event.target.value
    })

  private onSave = () => {
    const task = { ...this.state }
    // normalize empty string to undefined
    if (task.description != null && task.description.trim() === '') {
      task.description = undefined
    }
    if (this.state.id == null) {
      this.props.dispatch(taskAdd(task))
    } else {
      this.props.dispatch(taskUpdate(task))
    }
  }

  private onDelete = () => {
    this.props.dispatch(taskDelete(this.state.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTask)
