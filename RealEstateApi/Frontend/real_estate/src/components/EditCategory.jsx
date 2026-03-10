import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // Load category data
  const getCategory = async () => {
    try {
      const res = await axios.get(`https://localhost:7225/api/category/${id}`);
      setName(res.data.name);
      setOldImage(res.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `https://localhost:7225/api/category/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Category Updated");

      navigate("/admin/list-category");

    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <h2 className="mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload New Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Current Image</label>
          <br />

          {oldImage && (
            <img
              src={`https://localhost:7225${oldImage}`}
              alt="Category"
              width="150"
              style={{ borderRadius: "5px" }}
            />
          )}
        </div>

        <button className="btn btn-primary">
          Update Category
        </button>

      </form>

    </div>
  );
};

export default EditCategory;