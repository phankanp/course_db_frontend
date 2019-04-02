import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Courselist from './components/Courses.jsx'
import Login from './components/Login.jsx'
import AppHeader from './components/Header.jsx';
import './App.css';

class App extends Component {
  
  state = {}
  
  componentDidMount() {
    try {
      const user = {'firstName': window.sessionStorage.firstName, 'lastName': window.sessionStorage.lastName}

      this.setState({ user })
    } 
    catch (ex) {}
  }
  

  render() {
    return (
        <React.Fragment>
          <AppHeader user={this.state.user}  />
          <main className="content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Courselist} />
            </Switch>
          </main>
        </React.Fragment>
    );
  }
}

export default App;
