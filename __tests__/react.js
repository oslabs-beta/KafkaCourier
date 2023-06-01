import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from '../src/components/Login/Login.js';
import NavBar from '../src/components/NavBar/NavBar.jsx';
import Dashboard from '../src/components/dashboard/Dashboard.jsx';

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
    test('Renders without error', () => {
      const { container } = render(
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      );
      const element = document.getElementsByClassName('navBar').length;
      expect(element.length).toBe(1);
    });
  });

  // describe('Dashboard component', () => {
  //   const dashboard = render(
  //     <BrowserRouter>
  //       <Dashboard />
  //     </BrowserRouter>
  //   );

  //   // console.log('dashboard: ', dashboard);
  //   // console.log('getByText: ', dashboard.getByText('Topics'));
  //   // console.log('getByClass: ', document.getElementsByClassName('navBar'))

  //   test('Renders NavBar component', () => {
  //     expect(container.getElementsByClassName('navBar').length).toBe(1);
  //   })

  //   test('Renders KafkaContainer component', () => {
  //     expect(container.getElementsByClassName('kafka-container').length).toBe(1);
  //   })
  // })

});