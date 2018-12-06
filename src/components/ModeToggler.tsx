import { Radio } from 'antd'
import React from 'react'

import { RadioChangeEvent } from 'antd/lib/radio'
import { connect } from 'react-redux'
import { modeToggle } from '../store/actions'
import { AppState } from '../store/model'

interface Props {
  incrementMode: boolean
  onToggle: () => any
}

const mapStateToProps = (state: AppState) => ({
  incrementMode: state.incrementMode
})

class ModeToggler extends React.Component<Props> {
  public render() {
    return (
      <Radio.Group
        defaultValue={this.props.incrementMode ? '++' : '--'}
        buttonStyle="solid"
        onChange={this.onChange}
      >
        <Radio.Button value="--">--</Radio.Button>
        <Radio.Button value="++">++</Radio.Button>
      </Radio.Group>
    )
  }

  public onChange = (e: RadioChangeEvent) => {
    const newIncrementMode = e.target.value === '++'
    if (newIncrementMode !== this.props.incrementMode) {
      this.props.onToggle()
    }
  }
}

export default connect(
  mapStateToProps,
  {
    onToggle: modeToggle
  }
)(ModeToggler)
