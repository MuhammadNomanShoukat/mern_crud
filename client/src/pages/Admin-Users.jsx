import { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./Admin-Users.css";
import { useAuth } from "../store/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const apiUri = import.meta.env.VITE_APP_URI_API
  const navigate = useNavigate();
  const { token } = useAuth();

  const getUsers = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `${apiUri}/api/admin/users`,
      requestOptions,
    );

    const users = await response.json();

    setUsers(users);
  };

  const deleteUser = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    const response = await fetch(
      `${apiUri}/api/admin/user/${id}`,
      requestOptions,
    );

    const user = await response.json();

    if (response.ok && response.status === 200) {
      setUsers(filteredUsers.filter((user) => user._id !== id));
    }else{
      alert("User not deleted yet")
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm),
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(user._id);
    }
  };

  const handleEdit = (user) => {
    navigate(`/admin/user/${user._id}`);
  };

  return (
    <div className="container">
      <div className="admin-header">
        <h1>Users Management</h1>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "#c6f6d5", color: "#22543d" }}
          >
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Admin Users</h3>
            <p>{users.filter((u) => u.isAdmin).length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <div className="table-header">
          <h2>All Users</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.isAdmin ? "status-active" : "status-inactive"
                        }`}
                      >
                        Admin
                      </span>
                    </td>
                    <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          title="Edit user"
                          onClick={() => handleEdit(user)}
                        >
                          <FaEdit /> Edit
                        </button>
                        {/* <Link to={`/admin/user/${user._id}`} className="btn-edit" title="Edit user">
                        Edit link
                        </Link> */}
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user)}
                          title="Delete user"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <FaUsers />
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
