import React, { useEffect, useState } from 'react'
import "./NavbarMobile.css"
import { auth, db } from '../../Config/config'
import { getDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

export default function NavbarMobile() {
  const [userNameState, setUserNameState] = useState(null);

  async function fetchUserName() {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user)
      const navList = document.querySelector('.nav-list');
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserNameState(docSnap.data());

          //resize navbar when logged in
          navList.classList.add('login');
        } else {
          console.log("User is not logged in")
        }
      } else {
        setUserNameState(null);
        navList.classList.remove('login');
      }
    })
  }

  async function handleLogOut() {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!", { position: "top-center", hideProgressBar: true });
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
    } catch(error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  }

  useEffect(() => {
    fetchUserName();
    return () => fetchUserName();
  },[])

  //Automatic Sign out after 2 hours
  useEffect(() => {
    let timeout;
    auth.onAuthStateChanged((user) => {
        if (user) {
            timeout = setTimeout(async () => {
                await auth.signOut();
                toast.info("Session expired. Please log in again.", { position: "top-center", hideProgressBar: true });
                setTimeout(() => {
                  window.location.href = "/";
              }, 1500);
            }, 2 * 60 * 60 * 1000);
        } else {
            clearTimeout(timeout);
        }
    });

    return () => clearTimeout(timeout);
}, []);

  return (
    <nav className="nav fixed-bottom">
      <ul className='nav-list'>
        <li><a className="navbar-brand" href="/"><i className="fa-solid fa-house"></i>Home</a></li>
        <li>
          {userNameState ? (
            <button className="user-section" onClick={handleLogOut}>
              <i className="fa-solid fa-user"></i>Logout
            </button>
          ) : (<a href="/login"><i className="fa-solid fa-user"></i>Login</a>)}
        </li>
        <li>
            <a href='#'><i className="fa-regular fa-star"></i>Favorite</a>
        </li>
        <li className="">
          <a className="position-relative" href="/cart">
              <i className="fa-solid fa-cart-shopping"></i>Cart
              <span className="translate-middle badge rounded-pill bg-danger danger-mobile">
                99+
                <span className="visually-hidden">cart items</span>
              </span>
          </a>
        </li>
      </ul>
      <ToastContainer />
    </nav>
  )
}
