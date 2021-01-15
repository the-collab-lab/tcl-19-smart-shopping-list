import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ItemsList from './components/ItemsList';
import AddItems from './components/AddItems';
import Nav from './components/Nav';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          <ItemsList />
        </Route>
        <Route path="/addItem">
          <AddItems />
        </Route>
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
