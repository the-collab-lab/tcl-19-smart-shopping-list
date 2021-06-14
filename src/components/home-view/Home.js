import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shoppingListCollection } from '../../lib/firebase';
import getToken from '../../lib/tokens';

import spinner from '../../img/loader.gif';
import Modal from '../Modal';

import welcome from '../../img/welcome.png';

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

    if (existingToken.trim() === '') {
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
        className="w-36 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={spinner}
        alt="Loading..."
      />
    );
  }

  return (
    <div className="bg-gradient-to-b from-green-300 to-blue-700 min-h-screen w-screen flex flex-col items-center justify-around text-center text-gray-100 text-lg font-light font-sans">
      <Modal
        message={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className=" w-full pt-6 flex flex-col items-center">
        <h1 className="text-gray-900 font-normal text-3xl sm:text-4xl leading-loose">
          Welcome to <br />
          Smart Shopping App
        </h1>
        <img className="m-auto w-40 sm:w-56 mt-6" src={welcome} alt="" />
      </div>
      <button
        type="submit"
        onClick={newList}
        className="home-btn hover:bg-blue-600"
      >
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
          className="input my-2 py-2"
        />
        <button type="submit" className="home-btn mx-auto">
          Join list
        </button>
      </form>
    </div>
  );
};

export default Home;
