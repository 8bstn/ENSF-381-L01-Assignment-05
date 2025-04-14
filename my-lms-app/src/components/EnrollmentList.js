import React, { useEffect, useState } from "react";
import EnrolledCourse from "./EnrolledCourse";

const EnrollmentList = ({ enrolledCourses, setEnrolledCourses }) => {
  const dropCourse = (id) => {
    const studentId = localStorage.getItem("studentId");
  
    fetch(`http://localhost:5000/drop/${studentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Optimistically update the UI
        const updated = enrolledCourses.filter((course) => course.id !== id);
        setEnrolledCourses(updated);
        alert(data.message);
      })
      .catch((err) => {
        console.error("Drop failed:", err);
      });
  };  

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + course.creditHours,
    0
  );

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
  
    if (!studentId) {
      console.error("Student ID not found in localStorage.");
      return;
    }
  
    fetch(`http://localhost:5000/student_courses/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setEnrolledCourses(data);
      })
      .catch((err) => {
        console.error("Failed to fetch enrolled courses:", err);
      });
  }, []);  

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
