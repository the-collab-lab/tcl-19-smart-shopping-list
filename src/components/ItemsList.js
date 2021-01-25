import React from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const db = firebase.firestore().collection('shopping_list');

const ItemsList = () => {
  const userToken = localStorage.getItem('token');

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
    { idField: 'documentId' },
  );
  const markItemAsPurchased = (index) => {
    const { items, documentId } = shoppingList[0];
    const shoppingListObject = items[index];
    if (shoppingListObject.lastPurchasedOn !== null) {
      return;
    }
    shoppingListObject.lastPurchasedOn = Date.now();
    items[index] = shoppingListObject;
    db.doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully updated item'))
      .catch((e) => console.log('error', e));
  };
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
                  <label>
                    {shoppingItemObject.shoppingListItemName}
                    <input
                      type="checkbox"
                      onChange={() => markItemAsPurchased(index)}
                      checked={
                        shoppingItemObject.lastPurchasedOn === null
                          ? false
                          : true
                      }
                    />
                  </label>
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
