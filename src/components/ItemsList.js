import React, { useState } from 'react';
import firebase from '../lib/firebase';
import Nav from './Nav';
import '../styles/ItemsList.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import SearchBar from './SearchBar';
import {
  getShoppingItemBackgroundStyles,
  getItemDescription,
  sortShoppingList,
} from './sortingFunctions';
import { ReactComponent as TrashBin } from '../img/trash-alt-regular.svg';
import { ReactComponent as HomeIcon } from '../img/home-solid.svg';

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
    <div className="h-screen flex flex-col">
      <header className="bg-gray-500 w-full fixed text-center">
        <h1 className="bg-red-500 pt-4 pb-12 text-3xl font-thin text-gray-100">
          Your Shopping List
        </h1>
        <span className="text-white top-0 right-0 mt-4 mr-4 absolute">
          <HomeIcon />
        </span>
      </header>
      <main className="bg-white relative w-screen h-full mt-20 flex rounded-t-3xl justify-center">
        {loading && <p>Loading...</p>}
        {error && <p>An error has occured...</p>}
        {listHasNoItems && (
          <div className="flex flex-col w-screen justify-center items-center text-gray-900">
            <p className="">You haven't created a shopping list yet...</p>
            <button
              className="bg-white-100 px-6 py-3 text-sm mt-6 border border-color-gray-500 border-solid rounded shadow-md hover:bg-gray-500 cursor-pointer hover:text-white"
              type="submit"
              onClick={handleRedirect}
            >
              Add First Item
            </button>
          </div>
        )}
        {listHasAtLeastOneItem && (
          <div className="flex flex-col mt-6">
            <SearchBar
              value={searchTerm}
              setValue={(searchTerm) => {
                setSearchTerm(searchTerm);
              }}
            />
            <ul className="">
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
                      className="mt-2 py-2 flex items-center rounded"
                      key={shoppingItemObject.shoppingListItemName + index}
                      style={{
                        backgroundColor: getShoppingItemBackgroundStyles(
                          shoppingItemObject.daysLeftForNextPurchase,
                          getDaysBetweenCurrentAndPreviousPurchase,
                          shoppingItemObject.lastPurchasedOn,
                        ),
                      }}
                    >
                      <input
                        className="mx-2"
                        type="checkbox"
                        id={shoppingItemObject.shoppingListItemName}
                        onChange={() => markItemAsPurchased(shopIndex)}
                        checked={wasItemPurchasedWithinLastOneDay(
                          shoppingItemObject.lastPurchasedOn,
                        )}
                      />
                      <label
                        className="w-4/6"
                        htmlFor={shoppingItemObject.shoppingListItemName}
                        aria-label={getItemDescription(
                          shoppingItemObject.daysLeftForNextPurchase,
                        )}
                      >
                        {shoppingItemObject.shoppingListItemName}
                      </label>
                      <button
                        className="text-gray-100"
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
      </footer>
    </div>
  );
};

export default ItemsList;
