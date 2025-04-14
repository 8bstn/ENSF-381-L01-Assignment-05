import React, { useEffect, useState } from "react";
import EnrolledCourse from "./EnrolledCourse";

const EnrollmentList = ({ enrolledCourses, setEnrolledCourses }) => {
  const dropCourse = (id) => {
    const updated = enrolledCourses.filter(course => course.id !== id);
    setEnrolledCourses(updated);
  };

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + course.creditHours,
    0
  );

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <div>
      <h3>Enrolled Courses</h3>
      {enrolledCourses.map(course => (
        <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
      ))}
      <p>Total Credit Hours: {totalCredits}</p>
    </div>
  );
};

export default EnrollmentList;
