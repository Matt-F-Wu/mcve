import React, { Component } from 'react';

import UploadBundle from './components/UploadBundle';
import NewRun from './components/NewRun';
import './App.css';

class App extends Component {

  render() {
    return <div className="App">
    <div
      style={ {
        display: 'flex',
        flexDirection: 'row',
      } }
    >
      <UploadBundle />
      <NewRun />
    </div>
    </div>;
  }
}

export default App;
