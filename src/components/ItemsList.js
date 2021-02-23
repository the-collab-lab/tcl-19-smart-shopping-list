import React, { useState } from 'react';
import { shoppingListCollection } from '../lib/firebase';
import Nav from './Nav';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import SearchBar from './SearchBar';
import {
  getItemDescription,
  sortShoppingList,
  getShoppingItemBackgroundStyles,
  wasItemPurchasedWithinLastOneDay,
  getDaysBetweenCurrentAndPreviousPurchase,
} from '../utils/utility-functions';
import AddItemButton from './AddItemButton';
import { ReactComponent as TrashBin } from '../img/trash-alt-regular.svg';
import { ReactComponent as HomeIcon } from '../img/home-solid.svg';
import spinner from '../img/spinner-3.gif';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import '../index.css';

const ItemsList = () => {
  const userToken = localStorage.getItem('token');
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  const [
    shoppingList,
    loading,
    error,
  ] = useCollectionData(
    shoppingListCollection.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const markItemAsPurchased = (itemName) => {
    const { items, documentId } = shoppingList[0];
    const index = items.findIndex((obj) => {
      return obj.shoppingListItemName === itemName;
    });
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

    shoppingListCollection
      .doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully updated item'))
      .catch((e) => console.log('error', e));
  };

  const handleRedirect = () => {
    history.push('/additem');
  };

  const confirmDeleteItemHandler = (itemName) => {
    setShowDeleteModal(true);
    setItemToDelete(itemName);
  };

  const deleteItemFromShoppingList = (itemName) => {
    const deleteItemIndex = shoppingList[0].items.findIndex((obj) => {
      return obj.shoppingListItemName === itemName;
    });
    const { items, documentId } = shoppingList[0];
    items.splice(deleteItemIndex, 1);
    shoppingListCollection
      .doc(documentId)
      .update({
        items: items,
      })
      .then(() => console.log('Successfully deleted item'))
      .catch((e) => console.log('error', e));
  };

  const listHasAtLeastOneItem = shoppingList && shoppingList[0];

  const listHasNoItems = shoppingList && !shoppingList.length;
  if (loading) {
    return (
      <img
        className="m-auto w-20"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        src={spinner}
        alt="Loading..."
      />
    );
  }
  return (
    <div>
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteItemFromShoppingList={deleteItemFromShoppingList}
        itemToDelete={itemToDelete}
      />
      <div className="max-h-screen flex flex-col box-border items-center">
        <header className="bg-green-400 w-full fixed text-center">
          <h2 className="pt-6 pb-16 text-4xl font-thin text-gray-100">
            Your Shopping List
          </h2>
          <span className="text-white top-0 right-0 absolute sm:mt-4 sm:mr-4">
            <HomeIcon />
          </span>
        </header>
        <main className="bg-white relative w-full h-full mt-24 rounded-t-3xl overflow-auto">
          {error && <p>An error has occured...</p>}
          {listHasNoItems && (
            <div className="h-64 bg-white flex flex-col w-screen justify-center items-center text-gray-900">
              <p className="">You haven't created a shopping list yet...</p>
              <button
                className="bg-white-100 px-6 py-3 text-sm mt-6 border border-color-gray-500 border-solid rounded shadow-md hover:bg-green-500 cursor-pointer hover:text-white"
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
                    const {
                      shoppingListItemName,
                      daysLeftForNextPurchase,
                      lastPurchasedOn,
                    } = shoppingItemObject;
                    return (
                      <li
                        className="py-3 mt-2 rounded-lg flex items-center shadow-md"
                        key={shoppingListItemName + index}
                        style={{
                          backgroundColor: getShoppingItemBackgroundStyles(
                            daysLeftForNextPurchase,
                            lastPurchasedOn,
                          ),
                        }}
                      >
                        <input
                          className="mx-4"
                          type="checkbox"
                          id={shoppingListItemName}
                          onChange={() =>
                            markItemAsPurchased(shoppingListItemName)
                          }
                          checked={wasItemPurchasedWithinLastOneDay(
                            lastPurchasedOn,
                          )}
                        />
                        <label
                          className="flex-1 text-xl"
                          htmlFor={shoppingListItemName}
                          aria-label={getItemDescription(
                            daysLeftForNextPurchase,
                          )}
                        >
                          {shoppingListItemName}
                        </label>
                        <button
                          className="text-gray-100 mr-4"
                          onClick={() =>
                            confirmDeleteItemHandler(shoppingListItemName)
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
        <footer className="absolute bottom-0">
          <Nav />
          <AddItemButton />
        </footer>
      </div>
    </div>
  );
};

export default ItemsList;
