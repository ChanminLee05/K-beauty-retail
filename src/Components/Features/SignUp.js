import React, { useState } from 'react'
import { auth, db } from '../../Config/config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import "./Sign.css";
import View from "../../Assets/view.png";
import Hide from "../../Assets/hide.png";


export default function SignUp() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setPasswordShown] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setFName('');
            setLName('');
            setEmail('');
            setPassword('');
    
            const user = userCredential.user;
            // Save user details to Firestore
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fName,
                lastName: lName,
            });
            toast.success("Account registered successfully!", { position: "top-center", hideProgressBar: true });
            setTimeout(() => {
                window.location.href = "/";
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
                <input type='text' className='form-control' id='fName' placeholder='First Name' required onChange={(e) => setFName(e.target.value)} value={fName}></input>
                <label htmlFor='lName'>Last Name</label>
                <input type='text' className='form-control' id='lName' placeholder='Last Name' required onChange={(e) => setLName(e.target.value)} value={lName}></input>
                <label htmlFor='email'>Email</label>
                <input type='text' className='form-control' id='email' placeholder='Email'required onChange={(e) => setEmail(e.target.value)} value={email}></input>
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
                    <button className="password-show-btn" onClick={togglePassword}>
                        <img src={isPasswordShown ? View : Hide} alt={isPasswordShown ? 'Hide password' : 'Show password'}/>
                    </button>
                </div>
                <span>Already have an account? <a href='/login' className='sign-link'>Login</a></span>
                <button className="btn btn-primary sign-btn" type='submit'>SIGN UP</button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
