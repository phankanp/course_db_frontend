import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const AppHeader = ({user}) => {

  console.log(user)

  // const checkUser = () => {
  //   if (user) {
  //     return(
  //       <nav><span>Welcome {user.firstName} {user.lastName} !</span><NavLink classNameName="signout" to="/signout">Sign Out</NavLink></nav>
  //   );
  //   }
  // }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">Courses</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
         {!user && (
         <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Register</NavLink>
            </li>
         </React.Fragment>
         )}
         {user && (
         <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Welcome {user.firstName} {user.lastName}!</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>
         </React.Fragment>
         )}
        </ul>
      </div>
    </nav>  
  );
}

export default AppHeader