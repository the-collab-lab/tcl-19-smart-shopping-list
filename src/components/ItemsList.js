import React, { useState } from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import '../styles/ItemsList.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import '../styles/ItemsList.css';
import SearchBar from './SearchBar';

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
  const [searchTerm, setSearchTerm] = useState('');

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const markItemAsPurchased = (index) => {
    const { items, documentId } = shoppingList[0];
    const { lastPurchasedOn } = items[index];
    const shoppingItemObject = items[index];
    const presentDate = Date.now();

    if (lastPurchasedOn === null) {
      shoppingItemObject.lastPurchasedOn = presentDate;
      shoppingItemObject.numberOfPurchases++;
    } else {
      if (wasItemPurchasedWithinLastOneDay(lastPurchasedOn)) {
        return;
      } else {
        shoppingItemObject.numberOfPurchases++;
        const { daysLeftForNextPurchase } = shoppingItemObject;
        shoppingItemObject.daysLeftForNextPurchase = calculateEstimate(
          daysLeftForNextPurchase,
          getDaysBetweenCurrentAndPreviousPurchase(
            lastPurchasedOn,
            presentDate,
          ),
          shoppingItemObject.numberOfPurchases,
        );
        shoppingItemObject.lastPurchasedOn = presentDate;
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

  const deleteItemFromShoppingList = (itemName) => {
    const deleteItem = window.confirm(
      `Are you sure you want to delete ${itemName} from shopping list?`,
    );
    if (deleteItem === false) return;
    const deleteItemIndex = shoppingList[0].items.findIndex((obj) => {
      return obj.shoppingListItemName === itemName;
    });
    const { items, documentId } = shoppingList[0];
    items.splice(deleteItemIndex, 1);
    db.doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully deleted item'))
      .catch((e) => console.log('error', e));
  };

  const listHasAtLeastOneItem = shoppingList && shoppingList[0];
  const listHasNoItems = shoppingList && !shoppingList.length;

  return (
    <div className="items-list">
      <h1>Your Shopping List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>An error has occured...</p>}
      {listHasNoItems && (
        <div className="add-item">
          <p>You haven't created a shopping list yet...</p>
          <button type="submit" onClick={handleRedirect}>
            Add First Item
          </button>
        </div>
      )}
      {listHasAtLeastOneItem && (
        <div className="search-list">
          <SearchBar
            value={searchTerm}
            setValue={(searchTerm) => {
              setSearchTerm(searchTerm);
            }}
          />
          <ul>
            {shoppingList[0].items
              .filter((shoppingItemObject) =>
                shoppingItemObject.shoppingListItemName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )
              .map((shoppingItemObject, index) => {
                const shopIndex = shoppingList[0].items.indexOf(
                  shoppingItemObject,
                );
                return (
                  <li key={shoppingItemObject.shoppingListItemName + index}>
                    <input
                      type="checkbox"
                      id={shoppingItemObject.shoppingListItemName}
                      onChange={() => markItemAsPurchased(shopIndex)}
                      checked={wasItemPurchasedWithinLastOneDay(
                        shoppingItemObject.lastPurchasedOn,
                      )}
                    />
                    <label htmlFor={shoppingItemObject.shoppingListItemName}>
                      {shoppingItemObject.shoppingListItemName}
                    </label>
                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteItemFromShoppingList(
                          shoppingItemObject.shoppingListItemName,
                        )
                      }
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <Nav />
    </div>
  );
};

export default ItemsList;
