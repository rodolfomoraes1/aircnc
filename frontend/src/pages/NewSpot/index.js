import React, { useState, useMemo } from "react";

import camera from "../../assets/camera.svg"
import api from "../../services/api"
import "./styles.css";

export default function NewSpot({ history }){
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const multipartData = new FormData();
    const user_id = localStorage.getItem("user");

    multipartData.append('thumbnail', thumbnail);
    multipartData.append('company', company);
    multipartData.append('techs', techs);
    multipartData.append('price', price);

    await api.post("/spots", multipartData, {
      headers: {user_id}
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>      
      <label 
        id="thumbnail" 
        style={{backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail': ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">COMPANY *</label>
      <input 
        id="company"
        placeholder="Your company's name"  
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">TECHS * <span>(divided by comma)</span></label>
      <input 
        id="techs"
        placeholder="Your company's technologies"  
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">PRICE PER DAY * <span>(empty means free!)</span></label>
      <input 
        id="price"
        placeholder="Price charged per day"  
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Save</button>
    </form>  
  )
}