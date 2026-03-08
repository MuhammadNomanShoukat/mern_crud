import { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./Admin-Users.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      status: "active",
      joinDate: "2025-01-15",
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      status: "active",
      joinDate: "2025-02-20",
    },
    {
      id: 3,
      username: "bob_wilson",
      email: "bob@example.com",
      phone: "+1 456-789-0123",
      status: "inactive",
      joinDate: "2025-01-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
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
          <div className="stat-icon" style={{ background: "#c6f6d5", color: "#22543d" }}>
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Active Users</h3>
            <p>{users.filter((u) => u.status === "active").length}</p>
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
                  <tr key={user.id}>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.status === "active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" title="Edit user">
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user.id)}
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