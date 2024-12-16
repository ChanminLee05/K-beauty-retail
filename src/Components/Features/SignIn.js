import React, { useState } from 'react'
import { auth } from '../../Config/config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import "./Sign.css";
import View from "../../Assets/view.png";
import Hide from "../../Assets/hide.png";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setPasswordShown] = useState(false);
    
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

    function togglePassword() {
        const password = document.getElementById('password');
        const type = password.type === 'password' ? 'text' : 'password';
        password.type = type;
        setPasswordShown(!isPasswordShown);
    }

  return (
    <div className='sign-page'>
        <div className="sign-container">
            <h1>Login</h1>
            <form className='form-container' autoComplete='off' onSubmit={handleSignIn}>
                <label htmlFor='email'>Email</label>
                <input type='email' className='form-control' id='email' placeholder='Email'required onChange={(e) => setEmail(e.target.value)} value={email}></input>
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
                <button className="btn btn-primary sign-btn" type='submit'>Login</button>
                <a href='/password-reset' className='reset-link'>Forgot Password?</a>
                <span>New User?<a href='/sign-up' className='sign-link'>Register</a></span>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
