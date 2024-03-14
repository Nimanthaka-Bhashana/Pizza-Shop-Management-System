import React from "react";
import BannerImage from "../image/pizza.jpeg";
import  "../styles/Dashboard.css";







export default function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Pedro's Pizzeria </h1><br/>
        <p> PIZZA TO FIT ANY TASTE</p> <br/>
        
      </div>
    </div>
  )
}


