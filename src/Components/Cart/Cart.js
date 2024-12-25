import React, { useState, useEffect } from 'react'
import { auth, loadCartData, deleteCart } from '../../Config/config'
import Navbar from '../Navbar/Navbar';
import NavbarMobile from '../Navbar/NavbarMobile';
import "./Cart.css"
import "./CartMobile.css"

export default function Cart() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
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

  useEffect(() => {
    // Set userName when the user logs in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "User");
        fetchCartData(user.uid);
      } else {
        setUserName(null);
        setCartItems([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function fetchCartData(userId) {
    try {
      setIsLoading(true);
      const cartData = await loadCartData(userId);
      console.log(cartData)
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(userId, title) {
    try {
      await deleteCart(userId, title);
      // Update cartItems state after deletion
      setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
      console.log('Product deleted in Cart successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    return total + itemPrice;
  }, 0);

  return (
    <div className='cart-page'>
      {isMobile ? <NavbarMobile /> : <Navbar userName={userName} bgColor='white' borderColor="lightgray"/> }
      <div className='cart-container'>
        {isLoading ? (
          <p>Loading your cart...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className='cart-list'>
            {cartItems.map((item, index) => (
              <li key={index} className='cart-card'>
                <div className="cart-item-image">
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : ''}
                    alt={item.title}
                    className='cart-item-image'
                  />
                </div>
                <div className='cart-item-info'>
                  <h3 className='cart-item-title'>{item.title}</h3>
                  <p className='cart-item-desc'>{item.description}</p>
                  <div className="price-cart-btn-container">
                    <p>Price: <b>${item.price}</b></p>
                    <button className="product-cart-btn" onClick={() => handleDelete(auth.currentUser?.uid, item.title)}>
                      <i className="fa-solid fa-trash cart-icon"></i>
                      Delete
                  </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="pay-container">
        <div className="pay-info">
          <h4>Subtotal ({cartItems.length} items): ${subtotal.toFixed(2)}</h4>
          <button className="pay-btn">Proceed to Checkout ({cartItems.length} items)</button>
        </div>
      </div>
    </div>
  )
}
