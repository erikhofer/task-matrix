import { Button } from 'antd';
import * as React from 'react';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button>Moin</Button>
      </div>
    );
  }
}

export default App;
