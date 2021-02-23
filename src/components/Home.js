import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import getToken from '../lib/tokens';
import { ReactComponent as CartIcon } from '../img/cart2.svg';
import paid from '../img/paid.gif';

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
    <div className="bg-gradient-to-b from-green-300 to-blue-700 min-h-screen w-screen flex flex-col items-center justify-around text-center text-gray-100 text-lg font-light">
      <div className=" w-full pt-4 flex flex-col items-center">
        <h1 className="text-gray-900 font-normal text-4xl leading-loose">
          Welcome to <br />
          Smart Shopping App
        </h1>
        <span className="sm:hidden">
          <CartIcon />
        </span>
        <img className="hidden m-auto w-12" src={paid} alt="symbol" />
      </div>
      <button type="submit" onClick={newList} className="btn">
        Create List
      </button>
      <div>
        <p>- or -</p>
      </div>
      <div>
        <p>
          Join an existing list <br />
          by entering the three word token.
        </p>
      </div>
      <form onSubmit={submitToken} className="flex flex-col pb-4">
        <label htmlFor="token">Enter token</label>
        <input
          type="text"
          id="token"
          value={existingToken}
          onChange={tokenHandler}
          className="my-2 py-2 shadow-hover rounded-md border-transparent focus:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-900"
        />
        <button type="submit" className="btn">
          Join list
        </button>
      </form>
    </div>
  );
};

export default Home;
