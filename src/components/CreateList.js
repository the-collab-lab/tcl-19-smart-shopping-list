import React from 'react';
import { NavLink } from 'react-router-dom';
import getToken from '../lib/tokens';

const CreateList = () => {
  const newList = () => {
    const newToken = getToken();
    localStorage.setItem('newToken', newToken);
  };

  return (
    <div>
      <NavLink to="/list">
        <button type="submit" onClick={newList}>
          Create List
        </button>
      </NavLink>
    </div>
  );
};

export default CreateList;
