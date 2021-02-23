import React, { useState } from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import SearchBar from './SearchBar';
import {
  getShoppingItemBackgroundStyles,
  getShoppingItemTextStyles,
  getItemDescription,
  sortShoppingList,
} from './sortingFunctions';
import AddItemButton from './AddItemButton';
import { ReactComponent as TrashBin } from '../img/trash-alt-regular.svg';
import { ReactComponent as HomeIcon } from '../img/home-solid.svg';
import spinner from '../img/spinner-3.gif';
import '../index.css';

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
    if (!deleteItem) return;
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
    <div className="max-h-screen box-border flex flex-col items-center">
      <header className="bg-green-700 w-full fixed text-center text-gray-100">
        <h2 className="pt-8 pb-16 text-4xl font-thin">Your Shopping List</h2>
        <span className="absolute top-0 right-0">
          <HomeIcon />
        </span>
      </header>
      <main className="bg-white relative w-full h-screen mt-28 pb-24 rounded-t-3xl shadow-top overflow-auto">
        {loading && (
          <img className="m-auto w-12" src={spinner} alt="Loading..." />
        )}
        {error && <p>An error has occured...</p>}
        {listHasNoItems && (
          <div className="h-64 bg-white flex flex-col w-screen justify-center items-center text-gray-900">
            <p className="">You haven't created a shopping list yet...</p>
            <button
              className="bg-white-100 px-6 py-3 text-sm mt-6 rounded shadow-hover hover:bg-green-700 cursor-pointer hover:text-gray-100"
              type="submit"
              onClick={handleRedirect}
            >
              Add First Item
            </button>
          </div>
        )}
        {listHasAtLeastOneItem && (
          <div className="mt-6 max-w-md mx-auto overflow-auto">
            <SearchBar
              value={searchTerm}
              setValue={(searchTerm) => {
                setSearchTerm(searchTerm);
              }}
            />
            <ul className="mt-4 mb-2 mx-2">
              {shoppingList[0].items
                .filter((shoppingItemObject) =>
                  shoppingItemObject.shoppingListItemName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                )
                .sort(sortShoppingList)
                .map((shoppingItemObject, index) => {
                  const shopIndex = shoppingList[0].items.indexOf(
                    shoppingItemObject,
                  );
                  return (
                    <li
                      className="py-3 mt-2 rounded-lg flex items-center"
                      key={shoppingItemObject.shoppingListItemName + index}
                      style={{
                        backgroundColor: getShoppingItemBackgroundStyles(
                          shoppingItemObject.daysLeftForNextPurchase,
                          getDaysBetweenCurrentAndPreviousPurchase,
                          shoppingItemObject.lastPurchasedOn,
                        ),
                        color: getShoppingItemTextStyles(
                          shoppingItemObject.daysLeftForNextPurchase,
                          getDaysBetweenCurrentAndPreviousPurchase,
                          shoppingItemObject.lastPurchasedOn,
                        ),
                      }}
                    >
                      <input
                        className="mx-4 h-6 w-6 rounded text-pink-500 focus:ring-2 focus:ring-pink-600 cursor-pointer"
                        type="checkbox"
                        id={shoppingItemObject.shoppingListItemName}
                        onChange={() => markItemAsPurchased(shopIndex)}
                        checked={wasItemPurchasedWithinLastOneDay(
                          shoppingItemObject.lastPurchasedOn,
                        )}
                      />
                      <label
                        className="flex-1 text-xl"
                        htmlFor={shoppingItemObject.shoppingListItemName}
                        aria-label={getItemDescription(
                          shoppingItemObject.daysLeftForNextPurchase,
                        )}
                      >
                        {shoppingItemObject.shoppingListItemName}
                      </label>
                      <button
                        title="delete"
                        className="text-gray-100 mr-4"
                        onClick={() =>
                          deleteItemFromShoppingList(
                            shoppingItemObject.shoppingListItemName,
                          )
                        }
                      >
                        <span>
                          <TrashBin />
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </main>
      <footer>
        <Nav />
        <AddItemButton />
      </footer>
    </div>
  );
};

export default ItemsList;
