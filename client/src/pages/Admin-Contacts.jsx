import { useState, useEffect } from "react";
import { FaEnvelope, FaTrash, FaEye, FaReply } from "react-icons/fa";
import "./Admin-Contacts.css";
import { useAuth } from "../store/auth";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { token } = useAuth();

  const getContacts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      "http://localhost:5000/api/admin/contacts",
      requestOptions,
    );

    const contacts = await response.json();

    setContacts(contacts);
  };

  useEffect(()=>{
    getContacts()
  }, [])

  useEffect(() => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  }, [searchTerm, statusFilter, contacts]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((contact) => contact._id !== id));
    }
  };

  const handleViewMessage = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleMarkAsReplied = () => {
    if (selectedContact) {
      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact.id
            ? { ...contact, status: "replied" }
            : contact,
        ),
      );
      closeModal();
    }
  };

  return (
    <div className="container">
      <div className="admin-header">
        <h1>Contacts Management</h1>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaEnvelope />
          </div>
          <div className="stat-content">
            <h3>Total Messages</h3>
            <p>{contacts.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "#feebc8", color: "#7c2d12" }}
          >
            <FaEnvelope />
          </div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p>{contacts.filter((c) => c.status === "pending").length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "#c6f6d5", color: "#22543d" }}
          >
            <FaEnvelope />
          </div>
          <div className="stat-content">
            <h3>Replied</h3>
            <p>{contacts.filter((c) => c.status === "replied").length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-contacts-container">
        <div className="contacts-header">
          <h2>Contact Messages</h2>
          <div className="filter-controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        {filteredContacts.length > 0 ? (
          <div className="contacts-table-wrapper">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <strong>{contact.username}</strong>
                    </td>
                    <td>{contact.email}</td>
                    <td>
                      <div className="message-preview">{contact.message}</div>
                    </td>
                    <td>
                      <span
                        className={
                          contact.status === "replied"
                            ? "reply-badge"
                            : "pending-badge"
                        }
                      >
                        {contact.status === "replied" ? "Replied" : "Pending"}
                      </span>
                    </td>
                    <td>{new Date(contact.date).toLocaleDateString()}</td>
                    <td>
                      <div className="contact-actions">
                        <button
                          className="btn-expand"
                          onClick={() => handleViewMessage(contact)}
                          title="View message"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn-reply"
                          onClick={() => {
                            handleViewMessage(contact);
                          }}
                          title="Reply to message"
                        >
                          <FaReply />
                        </button>
                        <button
                          className="btn-delete-contact"
                          onClick={() => handleDelete(contact.id)}
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-contacts">
            <FaEnvelope />
            <h3>No contacts found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <div
        className={`contact-modal ${showModal ? "active" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            ✕
          </button>
          {selectedContact && (
            <>
              <div className="modal-header">
                <h3>Message Details</h3>
              </div>
              <div className="modal-field">
                <label>From:</label>
                <p>{selectedContact.username}</p>
              </div>
              <div className="modal-field">
                <label>Email:</label>
                <p>{selectedContact.email}</p>
              </div>
              <div className="modal-field">
                <label>Date:</label>
                <p>{new Date(selectedContact.date).toLocaleString()}</p>
              </div>
              <div className="modal-field">
                <label>Status:</label>
                <p>
                  <span
                    className={
                      selectedContact.status === "replied"
                        ? "reply-badge"
                        : "pending-badge"
                    }
                  >
                    {selectedContact.status === "replied"
                      ? "Replied"
                      : "Pending"}
                  </span>
                </p>
              </div>
              <div className="modal-field">
                <label>Message:</label>
                <p>{selectedContact.message}</p>
              </div>
              {selectedContact.status === "pending" && (
                <button
                  className="btn-reply"
                  onClick={handleMarkAsReplied}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#bee3f8",
                    color: "#2c5282",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  <FaReply /> Mark as Replied
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
