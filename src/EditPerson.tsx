import React from 'react'
import { CirclePicker, ColorResult } from 'react-color'

import { EditEntity } from './EditEntity'
import { Person } from './model'

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

export default class EditPerson extends React.Component<any, Person> {
  constructor(props: any) {
    super(props)

    const id: string = props.match.params.id

    if (id === 'new') {
      this.state = {
        color:
          AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
        id: null as any,
        name: ''
      }
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
        {this.state.color}
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

  private onColorChange = (color: ColorResult) =>
    this.setState({
      color: color.hex
    })

  private onSave = () => {
    // todo
  }
  private onDelete = () => {
    // todo
  }
}
