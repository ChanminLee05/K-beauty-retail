import React, { useState } from 'react'
import { auth } from '../../Config/config'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import "./Sign.css";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSignIn(e) {
        try {
            e.preventDefault();
            setEmail('');
            setPassword('');

            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in Successfully!", { position: "top-center", hideProgressBar: true });
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    }

  return (
    <div className='sign-page'>
        <div className="sign-container">
            <h1>Login</h1>
            <form className='form-container' autoComplete='off' onSubmit={handleSignIn}>
                <label htmlFor='email'>Email</label>
                <input type='text' className='form-control' id='email' placeholder='Email'required onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <label htmlFor='password'>Password</label>
                <input type='text' className='form-control' id='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <button className="btn btn-primary sign-btn" type='submit'>Login</button>
                <a href='/password-reset' className='reset-link'>Forgot Password?</a>
                <span>New User?<a href='/sign-up' className='sign-link'>Register</a></span>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
