import { Divider, Icon } from 'antd'
import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import EditPerson from './EditPerson'
import EditTask from './EditTask'
import Matrix from './Matrix'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1><Icon type="table" theme="outlined" /> Task Matrix</h1>
          <Divider />
          <Route path="/" exact component={Matrix} />
          <Route path="/task" component={EditTask} />
          <Route path="/person" component={EditPerson} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
