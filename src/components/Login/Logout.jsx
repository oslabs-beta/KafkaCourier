import React from 'react'
import { googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import './Login.scss';

export default function LogoutButton({ setLoggedIn, removeCookie }) {
  const handleClick = () => {
    removeCookie('kafka_courier_session', { path: '/' });
    setLoggedIn(false);
    googleLogout();
  }
  return (
    <Link to="/" onClick={handleClick}>
      <span id="logout-text">Logout</span>
    </Link>
  )
}