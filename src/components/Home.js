import React from 'react';
import { NavLink } from 'react-router-dom';
import getToken from '../lib/tokens';

const Home = () => {
  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
  };
  return (
    <div>
      <h1>Welcome to Smart Shopping App</h1>
      <NavLink to="/list">
        <button type="submit" onClick={newList}>
          Create List
        </button>
      </NavLink>
    </div>
  );
};

export default Home;
