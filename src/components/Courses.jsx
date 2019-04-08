import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../services/courseService";

class Courselist extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    const { data: courses } = await getCourses();

    this.setState({ courses });
  }

  render() {
    const courseCards = this.state.courses.map((course, index) => (
      <div
        className="col-md-6 col-sm-6 col-xs-12"
        style={{ paddingTop: "50px" }}
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
