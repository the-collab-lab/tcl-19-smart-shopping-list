import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Nav from './components/Nav';
import './styles/App.css';

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
      <Nav />
    </div>
  );
}

export default App;
