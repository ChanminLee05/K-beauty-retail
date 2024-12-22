import React, { useState, useEffect } from 'react'
import { auth, loadCartData, deleteCart } from '../../Config/config'
import Navbar from '../Navbar/Navbar';
import "./Cart.css"

export default function Cart() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <div className='cart-page'>
      <Navbar userName={userName} />
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
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="price-cart-btn-container">
                    <p>Price: ${item.price}</p>
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
    </div>
  )
}
