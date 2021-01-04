import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
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
