import React, { Component } from 'react';
import './App.css';

/* global firebase */

/* Function to send an email with firebase*/

const baseUrl = 'https://relai-223119.appspot.com';

function emailPartner(name, email){

  const argString = [
      `email=${ email }`,
      `name=${ name }`
    ].join('&');

  const actionCodeSettings = {
    // URL serves as a payload to our mobile app.
    // URL must be whitelisted in the Firebase Console.
    url: `${ baseUrl }/register?${ argString }`,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.relai.ios',
    },
    android: {
      packageName: 'com.relai.android',
      installApp: true,
    },
    dynamicLinkDomain: 'relai.page.link',
  };
  return firebase.auth().sendSignInLinkToEmail(
      email, actionCodeSettings);
}

class App extends Component {
  state = {
    email: '',
    name: '',
  }

  handleChange = (name) => (event) => {
    this.setState({[name]: event.target.value});
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="App">
        <div>
          Email:
          <input
            type="email"
            value={ email }
            onChange={this.handleChange("email") }
          />
        </div>
        <div>
          Name:
          <input
            type="text"
            value={ name }
            onChange={ this.handleChange("name") }
          />
        </div>
        <button onClick={ () => emailPartner(name, email) }>
          Send Email
        </button>
      </div>
    );
  }
}

export default App;
