import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  const [categories,setCategories] = useState([]);
  const [properties,setProperties] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    fetchCategories();
    fetchProperties();
  },[])

  const fetchCategories = async ()=>{
    const res = await axios.get("https://localhost:7225/api/user/categories");
    setCategories(res.data);
  }

  const fetchProperties = async ()=>{
    const res = await axios.get("https://localhost:7225/api/user/property");
    setProperties(res.data);
  }

  const filterByCategory = async (id)=>{
    setSelectedCategory(id);

    const res = await axios.get(`https://localhost:7225/api/user/property/category/${id}`);
    setProperties(res.data);
  }

  return (
    <div>

      {/* HERO */}
      <section className="bg-dark text-white p-5 text-center">
        <h1>Let's Find Your Dream House</h1>
      </section>


      {/* CATEGORY */}
      <div className="container mt-5">

        <h3 className="text-center mb-4">Explore Apartment Types</h3>

        <div className="row">

          {categories.map((cat)=>(
            <div className="col-md-3 mb-4" key={cat.id}>

              <div
                className="card text-center p-3 shadow"
                style={{cursor:"pointer"}}
                onClick={()=>filterByCategory(cat.id)}
              >

                <img
                  src={`https://localhost:7225${cat.imageUrl}`}
                  alt={cat.name}
                  style={{height:"80px",objectFit:"contain"}}
                />

                <h5 className="mt-3">{cat.name}</h5>

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* PROPERTY LIST */}
      <div className="container mt-5">

        <h3 className="text-center mb-4">Find Home Listing</h3>

        <div className="row">

          {properties.map((prop)=>(

            <div className="col-md-4 mb-4" key={prop.id}>

              <div className="card shadow">

                <img
                  src={`https://localhost:7225${prop.imageUrl}`}
                  className="card-img-top"
                  style={{height:"200px",objectFit:"cover"}}
                />

                <div className="card-body">

                  {/* Trending badge */}
                  {prop.isTrending && (
                    <span className="badge bg-danger mb-2">
                      Trending
                    </span>
                  )}

                  <h5>{prop.name}</h5>

                  <p>{prop.address}</p>

                  <h6 className="text-success">₹ {prop.price}</h6>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={()=>navigate(`/user/property/${prop.id}`)}
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;