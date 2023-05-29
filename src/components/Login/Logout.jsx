import React from 'react'
import { googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import './Login.css';

export default function LoginButton({ setLoggedIn, removeCookie }) {
  const handleClick = () => {
    // clear session cookie
    removeCookie('kafka_courier_session', { path: '/' });
    setLoggedIn(false);
    // this is the only logout-related function in react-oauth/google => not entirely sure if it's doing anything
    googleLogout();
  }
  return (
    <Link to="/" onClick={handleClick} >LOGOUT</Link>
  )
}