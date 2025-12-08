import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import Interactive3DBackground from './components/Interactive3DBackground';

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <div className="relative">
        <Interactive3DBackground />
        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default App;

