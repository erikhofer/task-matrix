import { Divider, Icon } from 'antd'
import * as React from 'react'
import { Route, Router } from 'react-router-dom'

import { history } from '../history'
import EditPerson from './EditPerson'
import EditTask from './EditTask'
import Matrix from './Matrix'

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div className="App">
          <h1>
            <Icon type="table" theme="outlined" /> Task Matrix
          </h1>
          <Divider />
          <Route path="/" exact component={Matrix} />
          <Route path="/task/:id" component={EditTask} />
          <Route path="/person/:id" component={EditPerson} />
        </div>
      </Router>
    )
  }
}

export default App
