import React, { useEffect, useState } from "react";
import courses from "../data/courses";
import testimonials from "../data/testimonials";

const getRandomItems = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    setFeaturedCourses(getRandomItems(courses, 3));
    setFeaturedTestimonials(getRandomItems(testimonials, 2));
  }, []);

  return (
    <main className="index">
      <section id="about">
        <h2>About LMS</h2>
        <p>
          The Learning Management System (LMS) helps students and instructors
          manage courses, quizzes, and track performance efficiently.
        </p>
        <h3>Key Features:</h3>
        <div>
          <p>- Enroll in courses</p>
          <p>- Attempt quizzes</p>
          <p>- View leaderboards</p>
        </div>
      </section>

      <section>
        <h2>Featured Courses</h2>
        <div className="featured-courses">
          {featuredCourses.map((course) => (
            <div key={course.id}>
              <img src={course.image} alt={course.name} style={{ width: "100px" }} />
              <p><strong>{course.name}</strong></p>
              <p>{course.instructor}</p>
              <p>{course.duration}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Student Testimonials</h2>
        <div className="testimonials">
          {featuredTestimonials.map((t, index) => (
            <div key={index}>
              <p><strong>{t.studentName}</strong> on <em>{t.courseName}</em></p>
              <p>"{t.review}"</p>
              <p>{"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainSection;
