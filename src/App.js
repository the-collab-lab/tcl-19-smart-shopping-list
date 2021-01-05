import React from 'react';
import './App.css';
import ItemsList from './lib/item-list';
import AddItemsToList from './lib/add-item';

function App() {
  return (
    <div className="App">
      <h1>Shopping List</h1>
      <ItemsList />
      <AddItemsToList />
    </div>
  );
}

export default App;
