import { SERVER_URL } from "../constants";
import http from "../services/httpService";

const courseApiEndpoint = SERVER_URL + "courses";

function courseUrl(id) {
  return `${courseApiEndpoint}/${id}`;
}

export function getCourses() {}

export function getCourse(courseId) {
  return http.get(courseUrl(courseId));
}

export function saveCourse(course) {
  if (course.id) {
    const body = { ...course };
    delete body.id;
    return http.put(courseUrl(course.id), body);
  }

  return http.post(courseApiEndpoint, course);
}
