import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { shoppingListCollection } from '../lib/firebase';
import getToken from '../lib/tokens';
import spinner from '../img/spinner-3.gif';

const Home = () => {
  const [existingToken, setExistingToken] = useState('');
  const [shoppingList, loading, error] = useCollectionData(
    shoppingListCollection.where('token', '==', existingToken),
  );
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
  if (loading) {
    return (
      <img
        className="m-auto w-20"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        src={spinner}
        alt="Loading..."
      />
    );
  }
  if (error) {
    return <p>An error has occurred</p>;
  }

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
