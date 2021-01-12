import React from 'react';
import firebase from '../lib/firebase';
import ItemsList from './ItemsList';

const List = () => {
  return (
    <div>
      <h1>Shopping List</h1>
      <ItemsList />
    </div>
  );
};

export default List;
