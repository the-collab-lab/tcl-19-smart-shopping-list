import React, { useState } from 'react';
import firebase from '../lib/firebase';

const userToken = localStorage.getItem('token');

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const [items, setItems] = useState('');

  !items &&
    db
      .where('token', '==', userToken)
      .get()
      .then((data) => {
        console.log(data.docs);
        if (data.docs.length) {
          let itemsList = data.docs[0]
            .data()
            .items.map((element) => element.shoppingListItemName);
          setItems(itemsList);
        }
      });

  return (
    <div>
      <h2>New List</h2>
      <div>
        <ul>
          {items.length > 0 &&
            items.map((val, index) => {
              return (
                <li key={index}>
                  <p>{val}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ItemsList;
