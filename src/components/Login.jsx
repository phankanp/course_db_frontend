import React, { Component } from 'react';
import { AUTH_SERVER_URL } from '../constants';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {username: '', password: '', isAuthenticated: false, open: false};
  }

  login = () => {
    const user = {email: this.state.username, password: this.state.password}
    fetch(AUTH_SERVER_URL + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
      const jwtToken = res.token
      if(jwtToken !== undefined) {
        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("firstName",  res.firstName)
        sessionStorage.setItem("lastName",  res.lastName)
        this.setState({isAuthenticated: true})
      }
      else {
        this.setState({open: true})
      }
    })
    .catch(err => console.error(err))
  }

  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  handleClose = (event) => {
    this.setState({ open: false });
  }

  render() {
    if (this.state.isAuthenticated === true) {
      window.location = '/'
    }
    else {
      return (
        <div className="container" style={{width:'300px', max:'100%', margin:'50px auto', paddingTop:'150px'}}>
          <h2 className="text-center" style={{paddingBottom:'10px'}}>Login</h2>
          <div className="row">
            <div className="col-md-12 form-group">
                <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group">
                <input name="password" type="password" placeholder="Enter your Password" onChange={this.handleChange} className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group">
                <input type="submit" className="btn btn-primary btn-block" onClick={this.login} placeholder="Enter your Password" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;