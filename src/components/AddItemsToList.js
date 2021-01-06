import React, { useState } from 'react';
import firebase from '../lib/firebase';

const AddItemsToList = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);

  function onSubmitItem(e) {
    e.preventDefault();
    if(itemName === '' || quantity === 0){
      alert("Please enter item name and quantity...")
      return
    }
    firebase
      .firestore()
      .collection('items')
      .add({
        item: itemName,
        how_much: quantity,
      })
      .then(() => {
        setItemName('');
        setQuantity(0);
      });
  }

  return (
    <form onSubmit={onSubmitItem}>
      <h2>Add Items to List</h2>
      <div>
        <label>
          Name
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.currentTarget.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(parseInt(e.currentTarget.value))}
          />
        </label>
      </div>
      <button type = "submit">Add Item</button>
    </form>
  );
};

export default AddItemsToList;
