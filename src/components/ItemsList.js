import React, { useEffect, useState } from 'react';
import firebase from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Nav from './Nav';

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const userToken = localStorage.getItem('token');

  // const [items, setItems] = useState('');

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
  );
  console.log(shoppingList);

  if (loading === true) {
    return <p> Loading... </p>;
  }
  if (error) {
    return <p> An error has occurred... </p>;
  }
  if (shoppingList.length === 0) {
    return <p> You haven't created a shopping list yet... </p>;
  }

  const { token } = shoppingList[0];

  const userShoppingList = shoppingList[0].items;

  console.log(userShoppingList);

  return (
    <div>
      <h2>Your Shopping List</h2>
      <div>
        {/* <p>{message}</p> */}
        <ul>
          {userShoppingList.length &&
            userShoppingList.map((shoppingItemObject, index) => {
              return (
                <li key={token + index}>
                  {shoppingItemObject.shoppingListItemName}
                </li>
              );
            })}
        </ul>
      </div>
      <Nav />
    </div>
  );
};

export default ItemsList;
