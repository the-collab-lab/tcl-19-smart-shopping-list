import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import { Alert } from 'rsuite';
import Nav from './Nav';

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
      alert('please add an item');
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
    <div className="flex justify-center ">
      <div className=" text-black mt-40 w-1/3">
        <form onSubmit={submitShoppingListItemHandler}>
          {shoppingListItemNameExists ? (
            <p>
              {`You have ${normalizeString(
                shoppingListItemName,
              )} in your shopping list already`}
            </p>
          ) : null}
          <div className="">
            <div className="flex justify-center">
              {/* <label className="text-black">Name of Item</label>  */}

              <input
                type="text"
                placeholder="Add Item..."
                value={shoppingListItemName}
                onChange={shoppingListItemNameHandler}
                className="border  text-grey-darkest w-2/3 px-4 py-3 mb-8 rounded"
              />
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <p className="font-bold">
              How soon are you likely to buy it again?
            </p>
          </div>
          <div className="flex space-x-4 text-black mb-8">
            <div className="w-1/3">
              <label>
                <input
                  type="radio"
                  name="next_purchase"
                  value="7"
                  checked={daysLeftForNextPurchase === 7}
                  onChange={daysLeftForNextPurchaseHandler}
                  className="mr-4"
                />
                Soon
              </label>
            </div>
            <div className="w-1/3">
              <label>
                <input
                  type="radio"
                  name="next_purchase"
                  value="14"
                  checked={daysLeftForNextPurchase === 14}
                  onChange={daysLeftForNextPurchaseHandler}
                  className="mr-4"
                />
                Kind of soon
              </label>
            </div>
            <div className="w-1/3">
              <label>
                <input
                  type="radio"
                  name="next_purchase"
                  value="30"
                  checked={daysLeftForNextPurchase === 30}
                  onChange={daysLeftForNextPurchaseHandler}
                  className="mr-4"
                />
                Not soon
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="flex items-center border py-2 px-3 hover:shadow-lg justify-center rounded-md bg-white text-black shadow-md w-60"
              type="submit"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
      <Nav />
    </div>
  );
};

export default AddItemsToList;
