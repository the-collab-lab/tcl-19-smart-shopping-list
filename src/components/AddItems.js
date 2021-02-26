import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import Nav from './Nav';
import ItemListButton from './ItemListButton';
import { ReactComponent as HomeIcon } from '../img/home-solid.svg';

const db = firebase.firestore().collection('shopping_list');

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const AddItemsToList = () => {
  const userToken = localStorage.getItem('token');
  const [shoppingListItemName, setShoppingListItemName] = useState('');
  const [daysLeftForNextPurchase, setDaysLeftForNextPurchase] = useState(7);
  const [shoppingListItemNameExists, setShoppingListItemNameExists] = useState(
    false,
  );

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
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

  const normalizeString = (str) => {
    const nonWordCharactersAndUnderscores = /[\W_]/g;
    return str.toLowerCase().replace(nonWordCharactersAndUnderscores, '');
  };

  function submitShoppingListItemHandler(event) {
    event.preventDefault();

    if (shoppingListItemName === '') {
      alert('Please add an item');
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

      db.doc(documentId)
        .update({
          items: arrayUnion(item),
        })
        .then(() => alert('successfully added'))
        .catch((e) => console.log('error', e));
    } else {
      db.add({
        token: userToken,
        items: [item],
      })
        .then(() => {
          alert('successfully added');
        })
        .catch((e) => console.log('error', e));
    }
    setShoppingListItemName('');
    setDaysLeftForNextPurchase(7);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <div className="bg-gradient-to-b from-green-300 to-blue-700 max-h-screen box-border flex flex-col items-center font-sans">
      <header className="w-full fixed text-center text-gray-800">
        <h2 className="pt-8 pb-16 text-4xl font-thin">Add Items to List</h2>
        <span className="absolute top-0 right-0 md:hidden">
          <HomeIcon />
        </span>
      </header>
      <main className="bg-white relative w-full h-screen mt-28 rounded-t-3xl shadow-top overflow-auto">
        <section className="max-w-md mx-auto overflow-auto py-6">
          <nav>
            <ItemListButton />
          </nav>
          <form
            className="pt-2 px-2 flex flex-col mx-auto"
            onSubmit={submitShoppingListItemHandler}
          >
            {shoppingListItemNameExists ? (
              <p>
                {`You have ${normalizeString(
                  shoppingListItemName,
                )} in your shopping list already`}
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
                    className="mr-2 h-5 w-5 text-green-600 focus:ring-1 focus:ring-green-600 cursor-pointer -mt-1"
                  />
                  Not soon
                </label>
              </section>
            </section>
            <button className="add-btn mx-auto" type="submit">
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
