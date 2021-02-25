import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shoppingListCollection } from '../lib/firebase';
import getToken from '../lib/tokens';
import spinner from '../img/spinner-3.gif';
import Modal from './Modal';

const Home = () => {
  const [existingToken, setExistingToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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
      setShowModal(true);
      setModalMessage('Please enter a token');
      return;
    }
    setLoading(true);
    shoppingListCollection
      .where('token', '==', existingToken.trim())
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setShowModal(true);
          setModalMessage(
            'Token does not exist. Please try again or create a new list.',
          );
          setExistingToken('');
          setLoading(false);
          return;
        }

        if (querySnapshot.size === 1) {
          const { token } = querySnapshot.docs[0].data();
          if (token === existingToken.trim()) {
            localStorage.setItem('token', token);
            history.push('/list');
          } else {
            // Unlikely this will happen. This is for safety just in case it does.
            throw new Error(
              'Token retrieved is not the same as provided token',
            );
          }
        } else {
          // Unlikely this will happen. This is for safety just in case it does.
          throw new Error('More than one shopping list with the same token');
        }
      })
      .catch((error) => {
        setShowModal(true);
        setLoading(false);
        setModalMessage('An error has occurred');
      });
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

  return (
    <div className="home">
      <Modal
        message={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
