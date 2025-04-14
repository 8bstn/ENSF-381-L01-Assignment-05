import React, { useState } from "react";

const CourseItem = ({ course, onEnroll }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowDesc(true)}
      onMouseLeave={() => setShowDesc(false)}
      style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
    >
      <img src={course.image} alt={course.name} width="150" />
      <h3>{course.name}</h3>
      <p>{course.instructor}</p>
      {showDesc && <p>{course.description}</p>}
      <button onClick={() => onEnroll(course)}>Enroll Now</button>
    </div>
  );
};

export default CourseItem;
