import React from 'react';
import firebase from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ItemsList = () => {
  const [shoppingList, loading, error] = useCollectionData(
    firebase.firestore().collection('shopping_list'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  // useCollectionData extracts firebase.firestore.QuerySnapshot.docs while useCollection
  // returns firebase.firestore.QuerySnapshot itself.
  return (
    <div>
      <h2>New List</h2>
      {loading === true ? <p> Loading... </p> : null}
      {error === undefined ? null : <p> An error has occurred... </p>}
      {shoppingList === undefined ? null : (
        <ol>
          {shoppingList.map((shoppingListItemObject) => (
            <li key={shoppingListItemObject.token}>
              <div>{shoppingListItemObject.shoppingListItemName}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ItemsList;
