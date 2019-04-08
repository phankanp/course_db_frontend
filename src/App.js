import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Courselist from "./components/Courses.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Register from "./components/Register.jsx";
import AppHeader from "./components/Header.jsx";
import CourseDetails from "./components/CourseDetail.jsx";
import CourseForm from "./components/CourseForm.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/common/protectedRoute.jsx";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <AppHeader user={this.state.user} />
        <main className="content">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/courses/form/:id" component={CourseForm} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/notFound" component={NotFound} />
            <Route path="/" component={Courselist} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
