import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://localhost:7225/api/category/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Category Added Successfully");

      // reset form
      setName("");
      setImage(null);
      setPreview("");

    } catch (error) {
      console.error(error);
      alert("Error adding category");
    }
  };

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Category Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <br />

        <div>
          <label>Category Image</label>
          <br />
          <input
            type="file"
            onChange={handleImageChange}
          />
        </div>

        <br />

        {preview && (
          <div>
            <p>Image Preview:</p>
            <img
              src={preview}
              alt="preview"
              width="150"
            />
          </div>
        )}

        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Category
        </button>

      </form>
    </div>
  );
};

export default AddCategory;