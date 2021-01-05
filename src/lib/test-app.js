import React from 'react';
import './App.css';
import ItemsList from './lib/item-list'  //Step 7: import list and add it to the function APP under <h1> //Step 8 -> create add-item
import AddItemsToList from './lib/add-item'   //Step 12 import the list and add it to the function APP under <ItemList />                                     


function App() {                      //Step 1: I restyled the app with h1 (Step 2 -> firebase.js)
  return (
    <div className="App">
      <h1>Shopping List</h1> 
      <ItemsList />   
      <AddItemsToList />         
    </div>
  );
}

export default App;