import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/service";
import Register from "./pages/register";
import Login from "./pages/login";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
