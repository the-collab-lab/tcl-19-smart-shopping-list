import React from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import '../styles/ItemsList.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const db = firebase.firestore().collection('shopping_list');

const wasItemPurchasedWithinLastOneDay = (lastPurchasedOn) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return Date.now() - lastPurchasedOn <= oneDayInMilliseconds;
};

const ItemsList = () => {
  const userToken = localStorage.getItem('token');

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const markItemAsPurchased = (index) => {
    const { items, documentId } = shoppingList[0];
    const shoppingListObject = items[index];

    if (shoppingListObject.lastPurchasedOn === null) {
      shoppingListObject.lastPurchasedOn = Date.now();
    } else {
      shoppingListObject.lastPurchasedOn = null;
    }

    items[index] = shoppingListObject;
    db.doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully updated item'))
      .catch((e) => console.log('error', e));
  };
  return (
    <div className="shoppinglist">
      <h1>Your Shopping List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>An error has occured...</p>}
      {shoppingList && !shoppingList.length && (
        <p>You haven't created a shopping list yet...</p>
      )}
      <form>
        <ul>
          {shoppingList &&
            shoppingList[0] &&
            shoppingList[0].items.map((shoppingItemObject, index) => {
              return (
                <li key={shoppingItemObject.shoppingListItemName + index}>
                  <input
                    type="checkbox"
                    id={shoppingItemObject.shoppingListItemName}
                    onChange={() => markItemAsPurchased(index)}
                    checked={
                      shoppingItemObject.lastPurchasedOn === null
                        ? false
                        : wasItemPurchasedWithinLastOneDay(
                            shoppingItemObject.lastPurchasedOn,
                          )
                    }
                  />
                  <label htmlFor={shoppingItemObject.shoppingListItemName}>
                    {shoppingItemObject.shoppingListItemName}
                  </label>
                </li>
              );
            })}
        </ul>
      </form>
      <Nav />
    </div>
  );
};

export default ItemsList;
