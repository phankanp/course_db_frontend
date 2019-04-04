import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Courselist from './components/Courses.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx';
import AppHeader from './components/Header.jsx';
import './App.css';

class App extends Component {
  
  state = {}
  
  
  componentDidMount() {
    if (window.sessionStorage.firstName !== undefined) {
      const user = {'firstName': window.sessionStorage.firstName, 'lastName': window.sessionStorage.lastName}

      this.setState({ user })
    } 
  }

  render() {
    return (
        <React.Fragment>
          <AppHeader user={this.state.user}  />
          <main className="content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Courselist} />
            </Switch>
          </main>
        </React.Fragment>
    );
  }
}

export default App;
