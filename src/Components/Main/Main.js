import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "./Main.css";
import 'react-toastify/dist/ReactToastify.css';
import NavbarMobile from '../Navbar/NavbarMobile';
import Category from './Category/Category';

export default function Main() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 992);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='banner-page banner-page-mobile'>
      {isMobile ? <NavbarMobile /> : <Navbar /> }
      {isMobile ? (
        <div>
          <h1 className='brand'>BrandNew</h1>
          <Category />
        </div>
      ) : (
        <div className="banner-container">
          <h4>Trade-in-offer</h4>
          <h2>Super value deals</h2>
          <h1>On all products</h1>
          <p>Save more with coupons &amp; up to 70% off!</p>
        </div>
      )}
    </div>
  )
}
