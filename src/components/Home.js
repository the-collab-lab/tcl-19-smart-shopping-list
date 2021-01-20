import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../lib/firebase';
import getToken from '../lib/tokens';

const db = firebase.firestore().collection('shopping_list');

const Home = () => {
  const [existingToken, setExistingToken] = useState('');
  const history = useHistory();

  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  const tokenHandler = (event) => {
    setExistingToken(event.target.value);
  };

  const submitToken = (e) => {
    e.preventDefault();

    db.where('token', '==', existingToken)
      .get()
      .then((data) =>
        data.docs.length
          ? (localStorage.setItem('token', existingToken),
            history.push('/list'))
          : (alert(
              'Token does not exist! Please try again or create a new list.',
            ),
            setExistingToken('')),
      );
  };

  return (
    <div>
      <div>
        <h1>Welcome to Smart Shopping App</h1>
        <button type="submit" onClick={newList}>
          Create List
        </button>
      </div>
      <div>
        <h3>Or Join an Existing list</h3>
        <form onSubmit={submitToken}>
          <label htmlFor="token">Enter token</label>
          <input
            type="text"
            id="token"
            value={existingToken}
            onChange={tokenHandler}
          />
          <button type="submit">Join list</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
