import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { getCourse, saveCourse } from "../services/courseService";

class CourseForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: ""
    },
    errors: {}
  };

  schema = {
    id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Course Title"),
    description: Joi.string()
      .required()
      .label("Course Description"),
    estimatedTime: Joi.string()
      .required()
      .label("Estimated Time"),
    materialsNeeded: Joi.string()
      .required()
      .label("Materials Needed")
  };

  async populateCourses() {
    try {
      const courseId = this.props.match.params.id;
      if (courseId === "new") {
        return;
      }

      const { data: course } = await getCourse(courseId);
      this.setState({
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("not found");
      }
    }
  }

  async componentDidMount() {
    await this.populateCourses();
  }

  doSubmit = async () => {
    try {
      await saveCourse(this.state.data);
      toast.success("Course has been updated.");
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        toast.error(ex.response.data.errorMessage);
        this.props.history.push("/courses/" + this.state.data.id);
      } else if (ex.response && ex.response.status === 401) {
        this.props.history.push("/logout");
        toast.error(ex.response.data.errorMessage);
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div style={{ paddingTop: "30px" }}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <h2>Course Form</h2>
              </div>
              <div className="col col-lg-3">{this.renderButton("Save")}</div>
            </div>
            <div className="row" style={{ paddingTop: "30px" }}>
              <div className="col">
                <h6 className="text-secondary">Course Title</h6>
                {this.renderInput("title", "text", "Course Ttitle")}
                <h6 className="text-secondary">Course Description</h6>
                {this.renderTextArea("description", "14", "Course Description")}
              </div>
              <div className="col col-lg-3">
                <h6 className="text-secondary">Estimate Time</h6>
                <hr />
                {this.renderInput("estimatedTime", "text", "Estimate Time")}
                <h6 className="text-secondary" style={{ paddingTop: "45px" }}>
                  Materials Needed
                </h6>
                <hr />
                {this.renderTextArea(
                  "materialsNeeded",
                  "10",
                  "Materials Needed"
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CourseForm;
