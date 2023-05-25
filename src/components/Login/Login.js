import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './Login.css';

export default function Login({
  setSub,
  setServerUri,
  setApiKey,
  setApiSecret,
  setLoggedIn,
  setInDatabase, 
  setCookie
}) {

  // function verifyUser(user) {
  async function verifyUser(user) {
    //check if they are in db
    const response = await fetch(`/api/checkUser/${user}`);
    // response.json() will contain object with user data, or undefined
    const result = (await response.json())[0];
    // if user is stored in database, update sub, server, key, and secret states
    if (result) {
      setSub(result.user_id);
      setServerUri(result.server);
      setApiKey(result.key);
      setApiSecret(result.secret);
      setInDatabase(true);

      // create session object to store in cookie
      const userSession = {
        user_id: result.user_id // add other relevant data if needed
      }
      // set session cookie
      setCookie('kafka_courier_session', userSession, { path: '/' });
    }

    else setInDatabase(false);
  }
    
  return (
    <div id="oauth">
      <GoogleLogin
        onSuccess={async credentialResponse => {
          const decoded = jwt_decode(credentialResponse.credential);
          console.log('decoded: ', decoded);
          setSub(decoded.sub);
          await verifyUser(decoded.sub);
          setLoggedIn(true);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  )
}