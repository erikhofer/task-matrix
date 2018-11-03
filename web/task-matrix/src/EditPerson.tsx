import React from 'react'
import { CirclePicker, ColorResult } from 'react-color'

import { EditEntity } from './EditEntity'
import { IPerson } from './model'

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

export default class EditPerson extends React.Component<any, IPerson> {
  constructor(props: any) {
    super(props)
    this.state = {
      color:
        AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
      id: '1',
      name: ''
    }
  }
  public render() {
    return (
      <EditEntity
        entityName="person"
        onSave={this.onSave}
        onDelete={this.onDelete}
      >
        {this.state.color}
        <br />
        <br />
        <CirclePicker
          color={this.state.color}
          onChangeComplete={this.onColorChange}
          colors={AVAILABLE_COLORS}
        />
      </EditEntity>
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
