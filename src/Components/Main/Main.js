import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Main.css";
import 'react-toastify/dist/ReactToastify.css';
import BannerImg from "../../Assets/cover.jpg";

export default function Main() {
  return (
    <div className='banner-page'>
      <Navbar />
      <img src={BannerImg} alt="banner-img" className="banner-img" />
      <div className="banner-container">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons &amp; up to 70% off!</p>
      </div>
    </div>
  )
}
