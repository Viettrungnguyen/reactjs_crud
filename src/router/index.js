import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Student from "../pages/Students";
function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/students" element={<Student />} />
    </Routes>
  );
}

export default MyRouter;
