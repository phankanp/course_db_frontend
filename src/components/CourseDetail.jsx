import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCourse, deleteCourse } from "../services/courseService";
import { toast } from "react-toastify";
const Markdown = require("react-markdown");

class CourseDetails extends Component {
  state = {
    course: {}
  };

  async componentDidMount() {
    try {
      const { data: course } = await getCourse(this.props.match.params.id);

      this.setState({ course });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/notFound");
      }
    }
  }

  populateMaterials() {
    if (
      this.state.course.materialsNeeded !== null &&
      this.state.course.materialsNeeded !== undefined
    ) {
      let materials = this.state.course.materialsNeeded.split("* ");

      materials.shift();

      const listItems = materials.map((materials, index) => (
        <li key={index}>{materials}</li>
      ));

      return listItems;
    }
  }

  handleEdit() {
    this.props.history.push("/courses/form/" + this.state.course.id);
  }

  async handleDelete() {
    try {
      await deleteCourse(this.state.course.id);
      toast.success("Course has been deleted.");
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Course has already been deleted");
        this.props.history.push("/");
      } else if (ex.response && ex.response.status === 401) {
        this.props.history.push("/logout");
        toast.error(ex.response.data.errorMessage);
      } else if (ex.response && ex.response.status === 403) {
        toast.error(ex.response.data.errorMessage);
      } else if (ex.response && ex.response.status === 404) {
        this.props.history.push("/notFound");
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div style={{ paddingTop: "30px" }}>
          <div className="btn-group" role="group">
            <div
              className="btn-group"
              role="group"
              style={{ paddingRight: "20px" }}
            >
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  this.handleEdit();
                }}
              >
                Update Course
              </button>
            </div>
            <div
              className="btn-group"
              role="group"
              style={{ paddingRight: "20px" }}
            >
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  this.handleDelete();
                }}
              >
                Delete Course
              </button>
            </div>
            <div
              className="btn-group"
              role="group"
              style={{ paddingRight: "20px" }}
            >
              <Link className="btn btn-primary btn-sm" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="row" style={{ paddingTop: "30px" }}>
            <div className="col">
              <h6 className="text-secondary">Course</h6>
              <h1>{this.state.course.title}</h1>
              <h6 className="text-secondary">
                By {this.state.course.firstName} {this.state.course.lastName}
              </h6>
              {
                <Markdown
                  source={this.state.course.description}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              }
            </div>
            <div className="col col-lg-3">
              <h6 className="text-secondary">Estimate Time</h6>
              <hr />
              <h5>{this.state.course.estimatedTime}</h5>
              <h6 className="text-secondary" style={{ paddingTop: "60px" }}>
                Materials Needed
              </h6>
              <hr />
              {this.populateMaterials()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetails;
