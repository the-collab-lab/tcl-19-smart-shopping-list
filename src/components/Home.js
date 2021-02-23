import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { shoppingListCollection } from '../lib/firebase';
import getToken from '../lib/tokens';

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
    shoppingListCollection.where('token', '==', existingToken),
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
  );
};

export default Home;
