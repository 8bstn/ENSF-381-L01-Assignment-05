import { useEffect, useState } from "react";
import CourseItem from "./CourseItem";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleEnroll = (course) => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("You must be logged in to enroll.");
      return;
    }

    fetch(`http://localhost:5000/enroll/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => {
        console.error("Enrollment failed:", err);
      });
  };

  return (
    <div>
      <h3>Course Catalog</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;