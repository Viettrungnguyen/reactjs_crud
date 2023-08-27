import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import User from "../pages/Users";
import UserCreate from "../pages/UserCreate";
function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/users" element={<User />} />
      <Route path="/users/create" element={<UserCreate />} />
    </Routes>
  );
}

export default MyRouter;
