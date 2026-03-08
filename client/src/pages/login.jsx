import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import Footer from "../components/Footer/Footer";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
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
        "http://localhost:5000/api/auth/login",
        requestOptions,
      );
      const data = await response.json();
      if (response.status === 200 && response.ok) {
        storeTokenInLs(data.token);
        resetForm();
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.extraDetails || data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error! Please try again.");
    }
  };
  return (
    <>
      <section className="section-login">
        <main>
          <div className="section-registeration">
            <div className="container grid grid-two-cols">
              <div className="registeration-image">
                <img
                  src="/images/login.svg"
                  alt="login image"
                  width="500"
                  height="500"
                />
              </div>
              <div className="regsiteration-form">
                <div className="form-header">
                  <h1 className="main-heading mb-3">Welcome Back</h1>
                  <p className="form-subtitle">Sign in to your account to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
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
                      placeholder="Enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="btn-submit">Sign In</button>
                  <p className="form-footer">Don't have an account? <a href="/register">Register here</a></p>
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

export default Login;
