import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default class Matrix extends React.Component {
  public render() {
    return (
      <div>
        <Link to="/person">
          <Button>New Person</Button>
        </Link>
      </div>
    )
  }
}
