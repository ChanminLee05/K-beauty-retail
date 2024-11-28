import React, { useState } from 'react'
import { auth } from '../../Config/config'
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

export default function PasswordReset() {
    const [email, setEmail] = useState('');

    async function handlePasswordReset(e) {
        try {
            e.preventDefault();
            await sendPasswordResetEmail(auth, email);
            console.log(auth, email)
            toast.success("Password reset link is sent to your email.", { position: "top-center", hideProgressBar: true });
            //Sign out the current user
            await auth.signOut();
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div className='sign-page'>
            <div className="sign-container">
                <h1>Reset Password</h1>
                <form className='form-container' autoComplete='off' onSubmit={handlePasswordReset}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' className='form-control' id='email' placeholder='Email'required onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <button className="btn btn-primary sign-btn" type='submit'>Reset Password</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
