import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5">Admin Dashboard</h2>

      <div className="row">

        {/* CATEGORY MANAGEMENT */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4">
            <h4 className="text-center">Category Management</h4>

            <div className="d-grid gap-2 mt-3">
              <Link to="/admin/add-category" className="btn btn-primary">
                Add Category
              </Link>

              <Link to="/admin/list-category" className="btn btn-info">
                View Categories
              </Link>
            </div>

          </div>
        </div>

        {/* PROPERTY MANAGEMENT */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4">
            <h4 className="text-center">Property Management</h4>

            <div className="d-grid gap-2 mt-3">

              <Link to="/admin/add-property" className="btn btn-success">
                Add Property
              </Link>

              <Link to="/admin/properties" className="btn btn-warning">
                View Properties
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;