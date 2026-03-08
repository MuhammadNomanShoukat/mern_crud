import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

const NavBar = () => {
  const [loggedInUser, setLoggedInUser] = useState(true);
  const { loggedIn, getAuthorizedUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      getAuthorizedUser();
      setLoggedInUser(false);
    }
  }, [getAuthorizedUser]);

  return (
    <header>
      <div className="container navbar">
        <div className="logo-brand">
          <NavLink to="">Demo Site</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            {loggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
