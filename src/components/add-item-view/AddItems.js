import React from 'react';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { shoppingListCollection, arrayUnion } from '../../lib/firebase';
import Nav from '../Nav';
import ItemListButton from './ItemListButton';
import { ReactComponent as HomeIcon } from '../../img/home-solid.svg';
import Modal from '../Modal';
import { normalizeString } from '../../utils/utility-functions';
import spinner from '../../img/loader.gif';

const AddItemsToList = () => {
  const userToken = localStorage.getItem('token');
  const [shoppingListItemName, setShoppingListItemName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [daysLeftForNextPurchase, setDaysLeftForNextPurchase] = useState(7);
  const [shoppingListItemNameExists, setShoppingListItemNameExists] = useState(
    false,
  );

  const [
    shoppingList,
    loading,
    error,
  ] = useCollectionData(
    shoppingListCollection.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const shoppingListItemNameHandler = (event) => {
    setShoppingListItemName(event.target.value);
    if (shoppingListItemNameExists === true) {
      setShoppingListItemNameExists(false);
    }
  };

  const daysLeftForNextPurchaseHandler = (event) => {
    setDaysLeftForNextPurchase(parseInt(event.target.value));
  };

  function submitShoppingListItemHandler(event) {
    event.preventDefault();

    if (shoppingListItemName === '') {
      setShowModal(true);
      setModalMessage('Please enter an item!');
      return;
    }
    const item = {
      shoppingListItemName,
      daysLeftForNextPurchase,
      lastPurchasedOn: null,
      numberOfPurchases: 0,
    };

    if (shoppingList.length) {
      const { documentId, items } = shoppingList[0];
      const shoppingListItemExists = items.some((shoppingListItemObject) => {
        return (
          normalizeString(shoppingListItemObject.shoppingListItemName) ===
          normalizeString(shoppingListItemName)
        );
      });
      if (shoppingListItemExists) {
        setShoppingListItemNameExists(true);
        return;
      }

      shoppingListCollection
        .doc(documentId)
        .update({
          items: arrayUnion(item),
        })
        .then(() => {
          setShowModal(true);
          setModalMessage(
            `Added ${shoppingListItemName} successfully to shopping list.`,
          );
        })
        .catch((e) => {
          setShowModal(true);
          setModalMessage(
            'Oops. An error has occurred. Please try again later',
          );
        });
    } else {
      shoppingListCollection
        .add({
          token: userToken,
          items: [item],
        })
        .then(() => {
          setShowModal(true);
          setModalMessage(
            `Added ${shoppingListItemName} successfully to shopping list.`,
          );
        })
        .catch((e) => {
          setShowModal(true);
          setModalMessage(
            'Oops. An error has occurred. Please try again later',
          );
        });
    }
    setShoppingListItemName('');
    setDaysLeftForNextPurchase(7);
  }

  if (loading) {
    return (
      <img
        className="w-36 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={spinner}
        alt="Loading..."
      />
    );
  }

  if (error) {
    return <p>An error has occured</p>;
  }

  return (
    <div className="bg-gradient-to-b from-green-300 to-blue-700 max-h-screen box-border flex flex-col items-center font-sans">
      <Modal
        message={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <header className="w-full fixed text-center text-gray-800">
        <h2 className="pt-8 pb-16 text-4xl font-thin">Add Items to List</h2>
        <span className="absolute top-0 right-0 hidden">
          <HomeIcon />
        </span>
      </header>
      <main className="bg-white relative w-full h-screen mt-28 rounded-t-3xl shadow-top overflow-auto">
        <section className="max-w-md mx-auto overflow-auto py-6">
          <nav>
            <ItemListButton showModal={showModal} />
          </nav>
          <form
            className="pt-2 px-2 flex flex-col mx-auto"
            onSubmit={submitShoppingListItemHandler}
          >
            {shoppingListItemNameExists ? (
              <p style={{ color: 'red' }}>
                {`You have ${normalizeString(
                  shoppingListItemName,
                )} in your shopping list already!`}
              </p>
            ) : null}
            <input
              aria-label="Add an item input"
              type="text"
              placeholder="Add Item..."
              value={shoppingListItemName}
              onChange={shoppingListItemNameHandler}
              className="input"
            />
            <p className="my-8 text-center">
              How soon are you likely to buy it again?
            </p>
            <section className="flex flex-col md:flex-row md:justify-around md:items-center mx-auto md:mx-0">
              <section>
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="7"
                    checked={daysLeftForNextPurchase === 7}
                    onChange={daysLeftForNextPurchaseHandler}
                    tabIndex={showModal ? -1 : 0}
                    className="mb-1 mr-2 h-5 w-5 text-green-600 focus:ring-1 focus:ring-green-600 cursor-pointer"
                  />
                  Soon
                </label>
              </section>
              <section>
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="14"
                    checked={daysLeftForNextPurchase === 14}
                    onChange={daysLeftForNextPurchaseHandler}
                    tabIndex={showModal ? -1 : 0}
                    className="mt-3 mb-4 md:mb-0 md:-mt-1 mr-2 h-5 w-5 text-green-600 focus:ring-1 focus:ring-green-600 cursor-pointer"
                  />
                  Kind of soon
                </label>
              </section>
              <section>
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="30"
                    checked={daysLeftForNextPurchase === 30}
                    onChange={daysLeftForNextPurchaseHandler}
                    tabIndex={showModal ? -1 : 0}
                    className="mr-2 h-5 w-5 text-green-600 focus:ring-1 focus:ring-green-600 cursor-pointer -mt-1"
                  />
                  Not soon
                </label>
              </section>
            </section>
            <button
              className="add-btn mx-auto md:mt-12"
              type="submit"
              tabIndex={showModal ? -1 : 0}
              id="addItemButton"
            >
              Add Item
            </button>
          </form>
        </section>
      </main>
      <footer>
        <Nav />
      </footer>
    </div>
  );
};

export default AddItemsToList;
