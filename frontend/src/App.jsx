import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/signup/Signup';
import { Signin } from './components/signin/Signin';
import {Route, Routes} from 'react-router-dom'
import { Grid } from './components/grid/Grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { socket } from './socket';
function App() {

  const token = localStorage.getItem("token");
  useEffect(() => {
    //socket.io handlers
    const onConnect = () => {

      console.log("connected to websocket");
    }
const onDisconnect = () => console.log("disconnected from websocket");
const onConnectError = (err) => console.error("Connection failed:", err.message);
//socket.io event listners
  //If token present, update auth + connect
  if (token) {
    socket.auth = { token };
    socket.connect();
  }
       socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("connect_error", onConnectError);
    // Cleanup (avoids multiple event listners)
  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("connect_error", onConnectError);
    socket.disconnect();
  };
  }, [token]);

  return (
    <>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      
      <Route path='/' element={
        <ProtectedRoute>
        <Grid />
        </ProtectedRoute>
        } />
    </Routes>
    </>
  )
}

export default App
