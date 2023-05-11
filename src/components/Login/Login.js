import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default function Login({ setSub, setLoggedIn }) {
  function handleLogout() {
      console.log('Logged out successfully')
    }
    
  return (
    <>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          const decoded = jwt_decode(credentialResponse.credential);
          setSub(decoded.sub);
          setLoggedIn(true);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  )
}