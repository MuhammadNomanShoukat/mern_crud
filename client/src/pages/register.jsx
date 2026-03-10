import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import Footer from "../components/Footer/Footer";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const apiUri = import.meta.env.VITE_APP_URI_API
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const resetForm = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `${apiUri}/api/auth/register`,
        requestOptions,
      );
      const data = await response.json();
      if (response.status === 200 && response.ok) {
        storeTokenInLs(data.token);
        resetForm();
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(data.extraDetails || data.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error! Please try again.");
    }
  };
  return (
    <>
      <section className="section-register">
        <main>
          <div className="section-registeration">
            <div className="container grid grid-two-cols">
              <div className="registeration-image">
                <img
                  src="/images/register.svg"
                  alt="registration image"
                  width="500"
                  height="500"
                />
              </div>
              <div className="regsiteration-form">
                <div className="form-header">
                  <h1 className="main-heading mb-3">Create Account</h1>
                  <p className="form-subtitle">Join us today and get started!</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(123) 456-7890"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="btn-submit">Create Account</button>
                  <p className="form-footer">Already have an account? <a href="/login">Login here</a></p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Register;
