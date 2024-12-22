import React, { useState } from 'react'
import { auth, db } from '../../Config/config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import "./Sign.css";
import View from "../../Assets/view.png";
import Hide from "../../Assets/hide.png";


export default function SignUp() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isPasswordShown, setPasswordShown] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setFName('');
            setLName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setAddress('');
            setCity('');
            setProvince('');
            setZipCode('');
            setCountry('');
            setDateOfBirth('');
    
            const user = userCredential.user;
            // Save user details to Firestore
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fName,
                lastName: lName,
                phoneNumber,
                address,
                city,
                province,
                zipCode,
                country,
                dateOfBirth,
                createdDateTime: new Date().toLocaleString(),
            });

            toast.success("Account registered successfully!", { position: "top-center", hideProgressBar: true });
            await auth.signOut();
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    }

    function togglePassword() {
        const password = document.getElementById('password');
        const type = password.type === 'password' ? 'text' : 'password';
        password.type = type;
        setPasswordShown(!isPasswordShown);
    }

  return (
    <div className='sign-page'>
        <div className="sign-container">
            <h1>Sign Up</h1>
            <form className='form-container' autoComplete='off' onSubmit={handleSignUp}>
                <label htmlFor='fName'>First Name</label>
                <input type='text' className='form-control' id='fName' placeholder='First Name' required onChange={(e) => setFName(e.target.value)} value={fName}/>
                <label htmlFor='lName'>Last Name</label>
                <input type='text' className='form-control' id='lName' placeholder='Last Name' required onChange={(e) => setLName(e.target.value)} value={lName}/>
                <label htmlFor='email'>Email</label>
                <input type='text' className='form-control' id='email' placeholder='Email'required onChange={(e) => setEmail(e.target.value)} value={email}/>
                <div className="password-container">
                    <label htmlFor='password'>Password</label>
                    <input 
                        type={isPasswordShown ? 'text' : 'password'} 
                        className='form-control' 
                        id='password' 
                        placeholder='Password' 
                        required 
                        minLength='8' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} />
                    <button type="button" className="password-show-btn" onClick={togglePassword}>
                        <img src={isPasswordShown ? View : Hide} alt={isPasswordShown ? 'Hide password' : 'Show password'}/>
                    </button>
                </div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="phoneNumber" className="form-control" id='phoneNumber' placeholder='Phone Number' required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id='address' placeholder='Address' required onChange={(e) => setAddress(e.target.value)} value={address}/>
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id='city' placeholder='City' required onChange={(e) => setCity(e.target.value)} value={city}/>
                <label htmlFor="province">Province</label>
                <input type="text" className="form-control" id='province' placeholder='State/Province/Region' required onChange={(e) => setProvince(e.target.value)} value={province}/>
                <label htmlFor="zipCode">ZIP</label>
                <input type="text" className="form-control" id='zipCode' placeholder='Zip Code' required onChange={(e) => setZipCode(e.target.value)} value={zipCode}/>
                <label htmlFor="country">Country</label>
                <input type="text" className="form-control" id='country' placeholder='Country' required onChange={(e) => setCountry(e.target.value)} value={country}/>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" className="form-control" id='dateOfBirth' required onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth}/>
                <span>Already have an account? <a href='/login' className='sign-link'>Login</a></span>
                <button className="btn btn-primary sign-btn" type='submit'>SIGN UP</button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
