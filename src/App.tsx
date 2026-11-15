import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About, { Marquee } from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Research from "./components/Research";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Experience />
          <Research />
          <Skills />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
