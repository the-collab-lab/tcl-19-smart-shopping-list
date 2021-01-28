import React from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import '../styles/ItemsList.css';

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const userToken = localStorage.getItem('token');
  const history = useHistory();

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
  );

  const handleRedirect = () => {
    history.push('/additem');
  };

  return (
    <div>
      <h1>Your Shopping List</h1>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>An error has occured...</p>}
        {shoppingList && !shoppingList.length && (
          <div className="add-item">
            <p>You haven't created a shopping list yet...</p>
            <button type="submit" onClick={handleRedirect}>
              Add Item
            </button>
          </div>
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
