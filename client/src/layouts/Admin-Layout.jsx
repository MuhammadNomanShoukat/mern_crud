import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaEnvelope, FaHome, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Footer from "../components/Footer/Footer";
import "./Admin-Layout.css";

const AdminLayout = () => {
  return (
    <>
      <div className="admin-container">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-title">
            <MdDashboard />
            <span>Admin Panel</span>
          </div>
          <nav>
            <ul className="admin-nav-list">
              <li className="admin-nav-item">
                <NavLink 
                  to="/admin" 
                  end
                  className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
                >
                  <FaHome />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="admin-nav-item">
                <NavLink 
                  to="/admin/users"
                  className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
                >
                  <FaUsers />
                  <span>Users</span>
                </NavLink>
              </li>
              <li className="admin-nav-item">
                <NavLink 
                  to="/admin/contacts"
                  className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
                >
                  <FaEnvelope />
                  <span>Contacts</span>
                </NavLink>
              </li>
              <li className="admin-nav-item">
                <NavLink 
                  to="/logout"
                  className="admin-nav-link"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
