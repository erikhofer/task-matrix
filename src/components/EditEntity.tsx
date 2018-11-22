import { Alert, Button, Divider, Modal, Spin } from 'antd'
import React from 'react'

import { history } from '../history'

interface State {
  error?: string
}

interface Props {
  entityName: string
  onSave: () => void
  onDelete: () => void
  create?: boolean
  loading: boolean
  renderForm: () => React.ReactNode
}

export class EditEntity extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: undefined
    }
  }

  public render() {
    const { renderForm, create, entityName, loading } = this.props

    return (
      <div>
        <h2>
          {create ? 'Create new' : 'Edit'} {entityName}
        </h2>
        {this.renderError()}
        {loading ? <Spin size="large" /> : renderForm()}
        <Divider />
        {create ? null : (
          <Button
            disabled={loading}
            onClick={this.showDeleteConfirm}
            type="danger"
          >
            Delete
          </Button>
        )}{' '}
        <Button onClick={this.close}>Cancel</Button>{' '}
        <Button type="primary" disabled={loading} onClick={this.handleSave}>
          Save
        </Button>
      </div>
    )
  }

  private handleSave = () => {
    try {
      this.props.onSave()
      this.close()
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  private close() {
    history.replace('/')
  }

  private showDeleteConfirm = () =>
    Modal.confirm({
      cancelText: 'No',
      content: 'This cannot be undone!',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        this.props.onDelete()
        this.close()
      },
      title: `Are you sure that you want to delete this ${
        this.props.entityName
      }?`
    })

  private renderError = () => {
    if (this.state.error) {
      return (
        <div>
          <Alert
            message="Error"
            description={this.state.error}
            type="error"
            showIcon
          />
          <br />
        </div>
      )
    }
    return null
  }
}
