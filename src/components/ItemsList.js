import React from 'react';
import firebase from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Nav from './Nav';

const ItemsList = () => {
  const [itemsList, loading, error] = useCollectionData(
    firebase.firestore().collection('items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  // useCollectionData extracts firebase.firestore.QuerySnapshot.docs while useCollection
  // returns firebase.firestore.QuerySnapshot itself.
  return (
    <div>
      <h1>Shopping List</h1>
      <h2>New List</h2>
      {loading === true ? <p> Loading... </p> : null}
      {error === undefined ? null : <p> An error has occurred... </p>}
      {itemsList === undefined ? null : (
        <ol>
          {itemsList.map((itemObject, index) => (
            <li key={itemObject.item + index}>
              <div>
                {itemObject.item},{itemObject.how_much}
              </div>
            </li>
          ))}
        </ol>
      )}
      <Nav />
    </div>
  );
};

export default ItemsList;
