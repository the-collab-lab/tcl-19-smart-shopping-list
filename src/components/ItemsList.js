import React from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const userToken = localStorage.getItem('token');

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
  );

  return (
    <div>
      <h1>Your Shopping List</h1>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>An error has occured...</p>}
        {shoppingList && !shoppingList.length && (
          <p>You haven't created a shopping list yet...</p>
        )}
        <ul>
          {shoppingList &&
            shoppingList[0] &&
            shoppingList[0].items.map((shoppingItemObject, index) => {
              return (
                <li key={shoppingItemObject.shoppingListItemName + index}>
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
