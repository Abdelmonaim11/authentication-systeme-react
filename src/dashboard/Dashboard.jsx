import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeLink, setActiveLink] = useState("Dashboard");
  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate("/signin"); // Redirect to the signin page
  };
  console.log(user);
  return (
    <div className="d-flex vh-100">
      <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />

      <div className="d-flex flex-column flex-grow-1">
        <Navbar user={user} logout={handleLogout} />

        <div className="p-4">
          <h1 className="mb-4">{activeLink}</h1>

          {activeLink === "Dashboard" && <DashboardContent />}
          {activeLink === "Products" && <ProductsContent />}
          {activeLink === "Upload File" && <UploadFileContent />}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeLink, setActiveLink }) => {
  const links = ["Dashboard", "Products", "Upload File"];

  return (
    <div className="text-bg-light" style={{ width: "250px" }}>
      <div className="p-3">
        <h2 className="fs-4 fw-bold">
          <img src="enset-logo.png" alt="logo" style={{ width: "220px" }} />
        </h2>
      </div>
      <nav className="mt-3">
        <ul className="nav flex-column">
          {links.map((link) => (
            <li key={link} className="nav-item">
              <button
                onClick={() => setActiveLink(link)}
                className={`nav-link d-flex align-items-center py-2 px-3 ${
                  activeLink === link
                    ? "active bg-secondary bg-opacity-25"
                    : "text-dark"
                }`}
              >
                <span>
                  {link === "Dashboard" && <DashboardIcon />}
                  {link === "Products" && <ProductsIcon />}
                  {link === "Upload File" && <UploadIcon />}
                </span>
                <span className="ms-2">{link}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <span className="navbar-brand">
          Welcome Back, {user?.name || "User"}!
        </span>
        <div className="ms-auto">
          <button
            className="btn btn-light rounded-circle"
            title="Logout"
            onClick={logout}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

const DashboardContent = () => (
  <div className="row g-4">
    <div className="col-md-6 col-lg-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-2">Total Sales</h5>
          <p className="card-text fs-3">$12,345</p>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-2">New Users</h5>
          <p className="card-text fs-3">321</p>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-2">Pending Orders</h5>
          <p className="card-text fs-3">15</p>
        </div>
      </div>
    </div>
  </div>
);

const ProductsContent = () => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title fw-bold mb-3">Product List</h5>
      <p className="card-text">Your products would appear here.</p>
    </div>
  </div>
);

const UploadFileContent = () => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title fw-bold mb-3">Upload Files</h5>
      <div className="border border-2 border-dashed p-5 text-center rounded">
        <UploadIcon className="mb-2 text-secondary" size={36} />
        <p>Drag and drop files here or click to browse</p>
        <button className="btn btn-primary mt-3">Browse Files</button>
      </div>
    </div>
  </div>
);

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-grid"
    viewBox="0 0 16 16"
  >
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zM10.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
  </svg>
);

const ProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-box"
    viewBox="0 0 16 16"
  >
    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-upload"
    viewBox="0 0 16 16"
  >
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-box-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
    />
    <path
      fillRule="evenodd"
      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
    />
  </svg>
);

export default Dashboard;
