import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Student from "../pages/Students";
import StudentCreate from "../pages/StudentCreate";
function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/students" element={<Student />} />
      <Route path="/students/create" element={<StudentCreate />} />
    </Routes>
  );
}

export default MyRouter;
