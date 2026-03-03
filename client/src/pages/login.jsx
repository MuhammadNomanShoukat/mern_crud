import { useState, useEffect } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registeration">
            <div className="container grid grid-two-cols">
              <div className="registeration-image">
                <img
                  src="/images/register.png"
                  alt="login image"
                  width="500"
                  height="500"
                />
              </div>
              <div className="regsiteration-form">
                <h1 className="main-heading mb-3">Registeration Form</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="enter email address"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="enter password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
