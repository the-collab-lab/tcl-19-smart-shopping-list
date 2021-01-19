import React, { useState } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import firebase from '../lib/firebase';
import getToken from '../lib/tokens';

const db = firebase.firestore().collection('shopping_list');

const Home = (props) => {
  const [existingToken, setExistingToken] = useState('');
  const [existingList, setExistingList] = useState('');

  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
  };

  const tokenHandler = (event) => {
    setExistingToken(event.target.value);
  };

  const submitToken = (e) => {
    e.preventDefault();
    console.log(existingToken);
    console.log(props);

    db.where('token', '==', existingToken)
      .get()
      .then((data) =>
        data.docs.length
          ? (localStorage.setItem('token', existingToken),
            props.history.push('/list'))
          : alert('wrong Token'),
      );
    return;
  };

  return (
    <div>
      <div>
        <h1>Welcome to Smart Shopping App</h1>
        <NavLink to="/list">
          <button type="submit" onClick={newList}>
            Create List
          </button>
        </NavLink>
      </div>
      <div>
        <h3>Or Join an Existing list</h3>
        <form onSubmit={submitToken}>
          <label>Enter Token</label>
          <input type="text" value={existingToken} onChange={tokenHandler} />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Home);
