import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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

  const [shoppingList] = useCollectionData(
    db.where('token', '==', existingToken),
  );

  const submitToken = (e) => {
    e.preventDefault();

    if (existingToken === '') {
      alert('Please enter a token...');
      return;
    }

    if (shoppingList.length) {
      localStorage.setItem('token', existingToken);
      history.push('/list');
    } else {
      alert('Token does not exist! Please try again or create a new list.');
      setExistingToken(' ');
    }
  };

  return (
    <div className="bg-green-500 h-screen w-screen flex flex-col items-center justify-around text-center text-white text-lg font-light">
      <div className="bg-gray-200 w-full py-16">
        <h1 className="text-gray-900 text-4xl">
          Welcome to Smart Shopping App
        </h1>
      </div>
      <button
        type="submit"
        onClick={newList}
        className="bg-green-400 py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 shadow-md font-light"
      >
        Create List
      </button>
      <div>
        <p>- or -</p>
      </div>
      <div>
        <p>
          Join an Existing list <br />
          by entering the three word token.
        </p>
      </div>
      <form onSubmit={submitToken} className="flex flex-col">
        <label htmlFor="token">Enter token</label>
        <input
          type="text"
          id="token"
          value={existingToken}
          onChange={tokenHandler}
          className="my-2 py-2 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-md text-gray-900"
        />
        <button
          type="submit"
          className="bg-green-400 py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 shadow-md font-light"
        >
          Join list
        </button>
      </form>
    </div>
  );
};

export default Home;
