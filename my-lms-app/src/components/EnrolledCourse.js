import React from "react";

const EnrolledCourse = ({ course, onDrop }) => (
  <div style={{ border: "1px solid green", margin: "10px", padding: "10px" }}>
    <h4>{course.name}</h4>
    <p>Credit Hours: {course.creditHours}</p>
    <button onClick={() => onDrop(course.id)}>Drop Course</button>
  </div>
);

export default EnrolledCourse;
