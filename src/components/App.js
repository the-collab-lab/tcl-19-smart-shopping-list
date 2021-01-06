import React from 'react';
import '../styles/App.css';
import ItemsList from './ItemsList';
import AddItemsToList from './AddItemsToList';

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
