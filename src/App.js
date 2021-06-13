import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItemsList from './components/list-view/ItemsList';
import AddItems from './components/add-item-view/AddItems';
import Home from './components/home-view/Home';

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {localStorage.getItem('token') ? (
        <Redirect to="/list" />
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default App;
