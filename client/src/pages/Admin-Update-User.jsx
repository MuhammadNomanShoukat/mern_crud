import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const AdminUpdateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    getUserInfo(id, token);
  }, []);

  const getUserInfo = async (id, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      return null;
    }
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

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", token);

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: raw,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/user/${id}`,
        requestOptions,
      );
      const data = await response.json();
      if (response.status === 200 && response.ok) {
        toast.success("updated successful!");
        navigate("/admin/users");
      } else {
        toast.error(
          data.extraDetails || data.message || "Registration failed!",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error! Please try again.");
    }
  };

  return (
    <>
      <h1>Update user</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
        <input
          type="number"
          name="phone"
          value={user.phone}
          onChange={handleInput}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default AdminUpdateUser;
