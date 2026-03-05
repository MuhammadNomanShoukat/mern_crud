import { useState, useEffect } from "react";


const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
                <h1 className="main-heading mb-3">Contact Form</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="enter username"
                    id="username"
                    required
                    autoComplete="off"
                    value={contact.username}
                    onChange={handleInput}
                  />
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter password"
                    id="email"
                    required
                    autoComplete="off"
                    value={contact.email}
                    onChange={handleInput}
                  />
                  <label htmlFor="message">message</label>
                  <textarea
                    rows={10}
                    cols={15}
                    name="message"
                    id="message"
                    value={contact.message}
                    onChange={handleInput}
                    autoComplete="off"
                    required
                  ></textarea>

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

export default Contact;
