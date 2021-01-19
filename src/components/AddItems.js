import React, { useState } from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';

const db = firebase.firestore().collection('shopping_list');

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const AddItemsToList = () => {
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

    const userToken = localStorage.getItem('token');

    if (shoppingListItemName === '') {
      alert('Please enter item name...');
      return;
    }

    const values = {
      shoppingListItemName,
      daysLeftForNextPurchase,
      lastPurchasedOn: null,
    };

    db.where('token', '==', userToken)
      .get()
      .then((data) => {
        if (data.docs.length) {
          db.doc(data.docs[0].id).update({
            items: arrayUnion(values),
          });
        } else {
          db.add({
            token: userToken,
            items: [values],
          });
        }
        setShoppingListItemName('');
        setDaysLeftForNextPurchase(7);
      });
  }
  return (
    <div>
      <div>
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
      </div>
      <Nav />
    </div>
  );
};

export default AddItemsToList;
