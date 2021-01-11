import React, { useReducer, useEffect } from 'react';
import firebase from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import getToken from '../lib/tokens';

const CreateList = () => {
  const newToken = useReducer(getToken, () => {
    const localData = localStorage.getItem('newToken');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('newToken', JSON.stringify(newToken));
  }, [newToken]);

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
