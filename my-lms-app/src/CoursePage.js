import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCatalog from "./components/CourseCatalog";
import EnrollmentList from "./components/EnrollmentList";

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("enrolledCourses");
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  const handleEnroll = (course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      const newCourse = { ...course, creditHours: 3 }; // You can customize this per course
      setEnrolledCourses([...enrolledCourses, newCourse]);
    }
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={handleEnroll} />
        <EnrollmentList
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
