import React, { useState } from 'react';
import firebase from '../lib/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const userToken = localStorage.getItem('token');

const db = firebase.firestore().collection('shopping_list').doc(userToken);

// const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

function getFakeRandomToken() {
  return localStorage.getItem('token');
  // return `${Math.round(Math.random() * 1e15)}`;
}

const AddItemsToList = () => {
  const [data] = useCollectionDataOnce(db.where('token', '==', userToken));
  const [shoppingListItemName, setShoppingListItemName] = useState('');
  const [daysLeftForNextPurchase, setDaysLeftForNextPurchase] = useState(7);

  const shoppingListItemNameHandler = (event) => {
    setShoppingListItemName(event.target.value);
  };
  const daysLeftForNextPurchaseHandler = (event) => {
    setDaysLeftForNextPurchase(parseInt(event.target.value));
  };
  function submitShoppingListItemHandler(event) {
    event.preventDefault();
    if (shoppingListItemName === '') {
      alert('Please enter item name...');
      return;
    }

    const values = {
      shoppingListItemName,
      daysLeftForNextPurchase,
      lastPurchasedOn: null,
    };

    if (data !== 'undefined') {
      db.update({
        items: [values],
      })
        .then(() => {
          console.log('item saved');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      db.add({
        token: getFakeRandomToken(),
        items: [values],
      })
        .then(() => {
          console.log('item saved');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <form onSubmit={submitShoppingListItemHandler}>
      <h2>Add Item to List</h2>
      <div>
        <label>
          Name
          <input
            type="text"
            value={shoppingListItemName}
            onChange={shoppingListItemNameHandler}
          />
        </label>
      </div>
      <fieldset>
        How soon are you likely to buy it again?
        <div>
          <label>
            Soon
            <input
              type="radio"
              name="next_purchase"
              value="7"
              checked={daysLeftForNextPurchase === 7}
              onChange={daysLeftForNextPurchaseHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Kind of soon
            <input
              type="radio"
              name="next_purchase"
              value="14"
              checked={daysLeftForNextPurchase === 14}
              onChange={daysLeftForNextPurchaseHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Not soon
            <input
              type="radio"
              name="next_purchase"
              value="30"
              checked={daysLeftForNextPurchase === 30}
              onChange={daysLeftForNextPurchaseHandler}
            />
          </label>
        </div>
      </fieldset>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemsToList;
