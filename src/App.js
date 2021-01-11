import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Nav from './components/Nav';
import './styles/App.css';
import ItemsList from './components/ItemsList';
import AddItemsToList from './components/AddItemsToList';
import CreateList from './components/CreateList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/addItem">
          <AddItem />
        </Route>
      </Switch>
      <h1>Shopping List</h1>
      <ItemsList />
      <AddItemsToList />
      <CreateList />
      <Nav />
    </div>
  );
}

export default App;
