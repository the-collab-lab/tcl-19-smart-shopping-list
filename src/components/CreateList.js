import React, { useEffect } from 'react';
import firebase from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import getToken from '../lib/tokens';

const CreateList = () => {
  const newToken = getToken();

  useEffect(() => {
    localStorage.setItem('newToken', newToken);
  });

  function onSubmitList() {}

  return (
    <form onSubmit={onSubmitList}>
      <div>
        <NavLink to="/list">
          <button type="submit">Create List</button>
        </NavLink>
      </div>
    </form>
  );
};

export default CreateList;
