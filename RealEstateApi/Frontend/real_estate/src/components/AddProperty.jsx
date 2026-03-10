import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProperty = () => {

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);

  // Load categories
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("detail", detail);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("isTrending", isTrending);
    formData.append("categoryId", categoryId);

    // temporary userId (until JWT is used)
    formData.append("userId", 1);

    formData.append("image", image);

    try {

      await axios.post(
        "https://localhost:7225/api/property/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Added Successfully");

      setName("");
      setDetail("");
      setPrice("");
      setAddress("");
      setCategoryId("");
      setImage(null);
      setIsTrending(false);

    } catch (error) {
      console.error(error);
      alert("Error adding property");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>

      <h2 className="mb-4">Add Property</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Property Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Detail</label>
          <textarea
            className="form-control"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>

          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isTrending}
            onChange={(e) => setIsTrending(e.target.checked)}
          />
          <label className="form-check-label">Trending Property</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Property Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button className="btn btn-success">
          Add Property
        </button>

      </form>

    </div>
  );
};

export default AddProperty;