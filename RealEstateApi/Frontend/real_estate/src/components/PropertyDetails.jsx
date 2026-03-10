import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {

  const {id} = useParams();

  const [property,setProperty] = useState(null);

  useEffect(()=>{
    fetchProperty();
  },[])

  const fetchProperty = async ()=>{
    const res = await axios.get(`https://localhost:7225/api/user/property/${id}`);
    setProperty(res.data);
  }

  if(!property) return <h3>Loading...</h3>

  return (
    <div className="container mt-5">

      <h2>{property.name}</h2>

      <img
        src={`https://localhost:7225${property.imageUrl}`}
        style={{width:"100%",height:"400px",objectFit:"cover"}}
      />

      <h4 className="mt-3 text-success">₹ {property.price}</h4>

      <p>{property.detail}</p>

      <h5>Address</h5>
      <p>{property.address}</p>

      <hr/>

      <h4>Contact Owner</h4>

      <p><b>Name:</b> {property.ownerName}</p>

      <p><b>Phone:</b> {property.ownerPhone}</p>

    </div>
  );
};

export default PropertyDetails;