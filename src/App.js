import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import List from './Components/List';
import AddItem from './Components/AddItem';
import Nav from './Components/Nav';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/addItem">
          <AddItem />
        </Route>
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
