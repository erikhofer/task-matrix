import { Button } from 'antd'
import React from 'react'

import { connect } from 'react-redux'
import { modeToggle } from './actions'
import { AppState } from './model'

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
      <Button onClick={this.props.onToggle}>
        {this.props.incrementMode ? '++' : '--'}
      </Button>
    )
  }
}

export default connect(
  mapStateToProps,
  {
    onToggle: modeToggle
  }
)(ModeToggler)
