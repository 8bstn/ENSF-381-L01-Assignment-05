import React from "react";
import CourseItem from "./CourseItem";
import courses from "../data/courses";

const CourseCatalog = ({ onEnroll }) => (
  <div>
    <h3>Course Catalog</h3>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
      ))}
    </div>
  </div>
);

export default CourseCatalog;
