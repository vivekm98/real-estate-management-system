import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:7225/api/category");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`https://localhost:7225/api/category/${id}`);

      alert("Category Deleted");

      getCategories(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h2>Category List</h2>

        <Link to="/admin/add-category" className="btn btn-primary">
          Add Category
        </Link>
      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th width="200">Actions</th>
          </tr>
        </thead>

        <tbody>

          {categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Categories Found
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id}>

                <td>{cat.id}</td>

                <td>{cat.name}</td>

                <td>
                  <img
                    src={`https://localhost:7225${cat.imageUrl}`}
                    alt={cat.name}
                    width="80"
                    height="60"
                    style={{ objectFit: "cover" }}
                  />
                </td>

                <td>

                  <Link
                    to={`/admin/edit-category/${cat.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default CategoryList;