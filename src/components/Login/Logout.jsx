import React from 'react'
import { googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import './Login.css';

export default function LoginButton({ setSub, setLoggedIn, setInDatabase }) {
  const handleClick = () => {
    console.log('logged out!!!!');
    setLoggedIn(false);
    // this is the only logout-related function in react-oauth/google => not entirely sure if it's doing anything
    googleLogout();
  }
  return (
    <Link to="/" onClick={handleClick} class="btn btn-blue">LOGOUT</Link>
  )
}