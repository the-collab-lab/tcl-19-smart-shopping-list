import React from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import '../styles/ItemsList.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import '../styles/ItemsList.css';

const db = firebase.firestore().collection('shopping_list');

const wasItemPurchasedWithinLastOneDay = (lastPurchasedOn) => {
  if (lastPurchasedOn === null) return false;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return Date.now() - lastPurchasedOn <= oneDayInMilliseconds;
};

const getDaysBetweenCurrentAndPreviousPurchase = (
  previousPurchaseDate,
  currentPurchaseDate = Date.now(),
) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return (currentPurchaseDate - previousPurchaseDate) / oneDayInMilliseconds;
};

const ItemsList = () => {
  const userToken = localStorage.getItem('token');
  const history = useHistory();

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const markItemAsPurchased = (index) => {
    const { items, documentId } = shoppingList[0];
    const { lastPurchasedOn } = items[index];
    const shoppingItemObject = items[index];
    if (lastPurchasedOn === null) {
      shoppingItemObject.lastPurchasedOn = Date.now();
      shoppingItemObject.numberOfPurchases++;
      shoppingItemObject.daysLeftForNextPurchase = calculateEstimate(
        undefined,
        shoppingItemObject.daysLeftForNextPurchase,
        shoppingItemObject.numberOfPurchases,
      );
    } else {
      if (wasItemPurchasedWithinLastOneDay(lastPurchasedOn)) {
        /*
        This code is evaluated if a user marks an item as purchased and 
        the user wants to reverse that decision. It is only possible to revert
        if a user has only recorded their first purchase. In this case, we
        revert the value of lastPurchasedOn to null, decrement 
        numberOfPurchases by 1 and maintain the value of daysLeftForNextPurchase,
        
        It is not possible to revert if purchase count exceeds 1 because once we 
        make subsequent purchases the value of lastPurchasedOn is overwritten therefore
        it is not possible to revert to the previous purchase in the DB.
        */
        if (shoppingItemObject.numberOfPurchases === 1) {
          shoppingItemObject.numberOfPurchases--;
          shoppingItemObject.lastPurchasedOn = null;
        } else {
          /*
          If we are dealing with subsequent purchases. we have already lost the
          lastPurchasedOn value for the previous purchase, there is no value to
          revert to. It doesn't make sense to revert to null either because a
          previous purchase has been made.
          return;
        */
        }
      } else {
        shoppingItemObject.numberOfPurchases++;
        const { daysLeftForNextPurchase } = shoppingItemObject;
        const now = Date.now();
        shoppingItemObject.daysLeftForNextPurchase = calculateEstimate(
          daysLeftForNextPurchase,
          getDaysBetweenCurrentAndPreviousPurchase(lastPurchasedOn, now),
          shoppingItemObject.numberOfPurchases,
        );
        shoppingItemObject.lastPurchasedOn = now;
      }
    }

    db.doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully updated item'))
      .catch((e) => console.log('error', e));
  };

  const handleRedirect = () => {
    history.push('/additem');
  };

  return (
    <div className="items-list">
      <h1>Your Shopping List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>An error has occured...</p>}
      {shoppingList && !shoppingList.length && (
        <div className="add-item">
          <p>You haven't created a shopping list yet...</p>
          <button type="submit" onClick={handleRedirect}>
            Add First Item
          </button>
        </div>
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
                    checked={wasItemPurchasedWithinLastOneDay(
                      shoppingItemObject.lastPurchasedOn,
                    )}
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
