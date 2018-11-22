import React, { ChangeEvent } from 'react'
import { CirclePicker, ColorResult } from 'react-color'

import { Input } from 'antd'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { DispatchProps, mapDispatchToProps } from 'src/store'
import { personAdd, personDelete, personUpdate } from 'src/store/actions'
import { AppState, Person } from '../store/model'
import { EditEntity } from './EditEntity'

const AVAILABLE_COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b'
]

interface EditPersonRouteParams {
  id: string
}

interface EditPersonStateProps {
  allPersons: Person[]
}

interface EditPersonProps
  extends DispatchProps,
    EditPersonStateProps,
    RouteComponentProps<EditPersonRouteParams> {}

const mapStateToProps = (state: AppState) => ({
  allPersons: state.persons
})

class EditPerson extends React.Component<EditPersonProps, Person> {
  constructor(props: EditPersonProps) {
    super(props)

    const id: string = props.match.params.id

    if (id === 'new') {
      this.state = {
        color:
          AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
        id: null as any,
        name: ''
      }
    } else {
      this.state =
        this.props.allPersons.find(person => person.id === id) ||
        ((null as unknown) as Person) // load indefinitely
    }
  }
  public render() {
    return (
      <EditEntity
        entityName="person"
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
        <CirclePicker
          color={this.state.color}
          onChangeComplete={this.onColorChange}
          colors={AVAILABLE_COLORS}
        />
      </div>
    )
  }

  private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    })
  }

  private onColorChange = (color: ColorResult) =>
    this.setState({
      color: color.hex
    })

  private onSave = () => {
    if (this.state.name.trim() === '') {
      throw new Error('Name is required!')
    }
    if (this.state.id == null) {
      this.props.dispatch(personAdd(this.state))
    } else {
      this.props.dispatch(personUpdate(this.state))
    }
  }
  private onDelete = () => {
    this.props.dispatch(personDelete(this.state.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPerson)
