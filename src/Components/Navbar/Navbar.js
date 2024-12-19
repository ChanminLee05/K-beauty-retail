import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { auth, db } from '../../Config/config'
import { getDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

export default function Navbar() {
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
    <nav className="nav fixed-top">
      <ul className='nav-list'>
        <li><a className="navbar-brand" href="/"><span>BrandNew</span></a></li>
        <li>
          {userNameState ? (
            <a className="user-section" href='#'>
              <span className="greeting">Hello,</span>
              {userNameState.firstName}
            </a>
          ) : (<a href="/login">Login</a>)}
        </li>
        <li>
          <details>
            <summary>Products</summary>
            <ul className="">
              <li><a className="" href="/toner">Toner<i className="fa-solid fa-caret-right"></i></a></li>
              <li><a className="" href="/lotion">Lotion<i className="fa-solid fa-caret-right"></i></a></li>
              <li><a className="" href="/serum">Serum<i className="fa-solid fa-caret-right"></i></a></li>
              <li><a className="" href="/add-products">Add Product</a></li>
            </ul>
          </details>
        </li>
        {userNameState ? (
          <li className="">
            <button className="logout-btn" onClick={handleLogOut}>Logout</button>
        </li>
        ) : <></>}
        <li className="">
          <a className="position-relative" href="/cart">
              <i className="fa-solid fa-cart-shopping nav-cart"></i>
              <span className="translate-middle badge rounded-pill bg-danger">
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
