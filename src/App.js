import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Courselist from "./components/Courses.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Register from "./components/Register.jsx";
import AppHeader from "./components/Header.jsx";
import CourseDetails from "./components/CourseDetail.jsx";
import auth from "./services/authService";
import "./App.css";
import CourseForm from "./components/CourseForm.jsx";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <AppHeader user={this.state.user} />
        <main className="content">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/courses/form/:id" component={CourseForm} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/" component={Courselist} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
