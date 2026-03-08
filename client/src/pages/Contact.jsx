import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import Footer from "../components/Footer/Footer";

const Contact = () => {
  const [userData, setUserData] = useState(true);
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { loggedInUser } = useAuth();

  if (loggedInUser && userData) {
    setContact({
      username: loggedInUser.username,
      email: loggedInUser.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const resetForm = () => {
    setContact({
      username: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(contact);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/form/contact",
        requestOptions,
      );
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        resetForm();
        toast.success("Message sent successfully!");
      } else {
        const data = await response.json();
        toast.error(data.extraDetails || data.message || "Failed to send message!");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while sending the message!");
    }
  };
  return (
    <>
      <section className="section-contact">
        <main>
          <div className="section-registeration">
            <div className="container grid grid-two-cols">
              <div className="registeration-image">
                <img
                  src="/images/contact.svg"
                  alt="contact image"
                  width="500"
                  height="500"
                />
              </div>
              <div className="regsiteration-form">
                <div className="form-header">
                  <h1 className="main-heading mb-3">Get in Touch</h1>
                  <p className="form-subtitle">
                    Welcome {loggedInUser ? loggedInUser.username : "Guest"}!
                    We'd love to hear from you.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Your username"
                      id="username"
                      required
                      autoComplete="off"
                      value={contact.username}
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
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Share your message here..."
                      value={contact.message}
                      onChange={handleInput}
                      autoComplete="off"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit">
                    Send Message
                  </button>
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

export default Contact;
