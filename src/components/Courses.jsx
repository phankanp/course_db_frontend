import React, { Component } from "react";
import { Link } from "react-router-dom";

class Courselist extends Component {
  // Defines array-type state value for courses
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }

  // Calls api endpoint to get all courses and saves to courses state
  componentDidMount() {
    fetch("http://localhost:8080/api/courses")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          courses: responseData
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const courseCards = this.state.courses.map((course, index) => (
      <div
        className="col-md-6 col-sm-6 col-xs-12"
        style={{ paddingTop: "20px" }}
        key={index}
      >
        <div className="card text-center">
          <div className="card-header" style={{ background: "#0abd6a" }}>
            Course
          </div>
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <Link
              to={`/courses/${course.id}`}
              className="btn btn-primary btn-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="CourseList">
          <h1 className="text-center" style={{ paddingTop: "20px" }}>
            Course List
          </h1>
          <div className="row">{courseCards}</div>
        </div>
      </div>
    );
  }
}

export default Courselist;
