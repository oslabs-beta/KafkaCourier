import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from '../src/components/Login/Login.js';
import NavBar from '../src/components/NavBar/NavBar.jsx';

describe('Unit testing React components', () => {

  describe('Login component', () => {
    test('Renders Login component', () => {
      render(
        <GoogleOAuthProvider>
          <Login />
        </GoogleOAuthProvider>
      )
      const element = document.getElementById('oauth');
      expect(element).toBeInTheDocument();
    });
  });

  describe('NavBar component', () => {
    test('renders without error', () => {
      const navBar = render(
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      );
      const element = document.getElementsByClassName('navBar');
      expect(element.length).toBe(1);
    });
  });

});