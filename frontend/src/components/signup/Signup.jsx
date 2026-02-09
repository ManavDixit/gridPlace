import React from 'react'
import './Signup.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async() => {
    // Handle signup logic here
    try {
      if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
      }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });
    const data = await response.json();
    localStorage.setItem('token', data?.token);
    localStorage.setItem('user', JSON.stringify(data?.user));
    navigate('/');
  } catch (error) {
    console.error('Error during signup:', error);
  }
  };
  return (
    <div className="signup">
        <h1>Sign up</h1>
        <div className='signup-container'>
           <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password" type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={handleSignup}>Signup</button>
            <p>Already have an account? <Link to="/signin">Signin</Link></p>

        </div>
    </div>
  )
}
