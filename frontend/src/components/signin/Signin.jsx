import React from 'react'
import './Signin.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignin = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            localStorage.setItem('token', data?.token);
            localStorage.setItem('user', JSON.stringify(data?.user));
            navigate('/');
        } catch (error) {
            console.error('Error during signin:', error);
        }
    };
  return (
    <div className="signin">
        <h1>Sign in</h1>
        <div className='signin-container'>
           <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <button onClick={handleSignin}>Signin</button>
            <p>don't have an account? <Link to="/signup">Signup</Link></p>

        </div>
    </div>
  )
}
