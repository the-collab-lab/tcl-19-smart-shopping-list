import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../lib/firebase';
import getToken from '../lib/tokens';
import '../styles/Home.css';

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
          : alert(
              'Token does not exist! Please try again or create a new list.',
            ),
      );
  };

  return (
    <div>
      <div className="home">
        <div>
          <h1>Welcome to Smart Shopping App</h1>
          <button type="submit" onClick={newList}>
            Create List
          </button>
        </div>
        <div>
          <p>- or -</p>
          <p>Join an Existing list by entering the three word token.</p>
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
    </div>
  );
};

export default Home;
