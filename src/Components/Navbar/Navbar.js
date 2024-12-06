import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { auth, db } from '../../Config/config'
import { getDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import Logo from "../../Assets/clown.png";

export default function Navbar() {
  const [userNameState, setUserNameState] = useState(null);

  async function fetchUserName() {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user)
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserNameState(docSnap.data())
        } else {
          console.log("User is not logged in")
        }
      } else {
        setUserNameState(null);
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

  useEffect(() => {
    function handleResize() {
      const dropdown = document.querySelector('.nav-item.drop');
      if (dropdown) {
        if (window.innerWidth < 992) {
          dropdown.classList.add('dropend');
          dropdown.classList.remove('dropdown');
        } else {
          dropdown.classList.add('dropdown');
          dropdown.classList.remove('dropend');
        }
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
            <img src={Logo} alt='logo-img' className='logo-img' /><span>BrandNew</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              {userNameState ? (
                <span className="user-section">
                  <span className="greeting">Hello,</span>
                  {userNameState.firstName}
                </span>
              ) : (<a href="/login">Login</a>)}
            </li>
            <li className="nav-item drop">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/toner">Toner</a></li>
                <li><a className="dropdown-item" href="/lotion">Lotion</a></li>
                <li><a className="dropdown-item" href="/serum">Serum</a></li>
                <li><a className="dropdown-item" href="/add-products">Add Product</a></li>
              </ul>
            </li>
            {userNameState ? (
              <li className="nav-item">
              <button className="nav-link" onClick={handleLogOut}>Logout</button>
            </li>
            ) : <></>}
            <li className="nav-item">
              <a className="nav-link position-relative" href="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span className="visually-hidden">cart items</span>
                  </span>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
      <ToastContainer />
</nav>
  )
}
