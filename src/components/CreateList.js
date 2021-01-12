import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getToken from '../lib/tokens';

const CreateList = () => {
  const newToken = getToken();

  useEffect(() => {
    localStorage.setItem('newToken', newToken);
  });

  return (
    <form>
      <div>
        <NavLink to="/list">
          <button type="submit">Create List</button>
        </NavLink>
      </div>
    </form>
  );
};

export default CreateList;
