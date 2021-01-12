import React, { useState } from 'react';
import firebase from '../lib/firebase';

function getFakeRandomToken() {
  return `${Math.round(Math.random() * 1e15)}`;
}

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
    if (shoppingListItemName === '') {
      alert('Please enter item name...');
      return;
    }
    firebase
      .firestore()
      .collection('shopping_list')
      .add({
        token: getFakeRandomToken(),
        shoppingListItemName,
        daysLeftForNextPurchase,
        lastPurchasedOn: null,
      })
      .then(() => {
        setShoppingListItemName('');
        setDaysLeftForNextPurchase(7);
      });
  }

  return (
    <form onSubmit={submitShoppingListItemHandler}>
      <h2>Add Item to your shopping List</h2>
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
      </fieldset>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemsToList;
