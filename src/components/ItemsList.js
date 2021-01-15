import React, { useEffect, useState } from 'react';
import firebase from '../lib/firebase';

const userToken = localStorage.getItem('token');

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const [items, setItems] = useState('');

  useEffect(() => {
    let mounted = true;
    db.where('token', '==', userToken)
      .get()
      .then((data) => {
        if (data.docs.length) {
          let itemsList = data.docs[0]
            .data()
            .items.map((element) => element.shoppingListItemName);
          if (mounted) {
            setItems(itemsList);
          }
        }
      });
    return () => (mounted = false);
  });
  return (
    <div>
      <h2>New List</h2>
      <div>
        <ol>
          {items.length ? (
            items.map((val, index) => {
              return (
                <li key={index}>
                  <p>{val}</p>
                </li>
              );
            })
          ) : items.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <p>Loading ...</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default ItemsList;
