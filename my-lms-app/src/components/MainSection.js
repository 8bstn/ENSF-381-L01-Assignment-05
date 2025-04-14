import { useEffect, useState } from "react";

const getRandomItems = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setFeaturedCourses(getRandomItems(data, 3)));

    fetch("http://localhost:5000/testimonials")
      .then((res) => res.json())
      .then((data) => setFeaturedTestimonials(data));
  }, []);

  return (
    <main className="index">
      {/* same HTML as before */}
    </main>
  );
};

export default MainSection;
