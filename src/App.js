import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CodalabTheme from './theme';

import UploadBundle from './components/NewUpload';
import NewRun from './components/NewRun';

class App extends Component {

  render() {
        return (
            <MuiThemeProvider theme={CodalabTheme}>
                <div
                  style={ {
                    display: 'flex',
                    flexDirection: 'row',
                  } }
                >
                  <UploadBundle />
                  <NewRun />
                </div>
            </MuiThemeProvider>
        );
  }
}

export default App;
