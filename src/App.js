import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItemsList from './components/ItemsList';
import AddItems from './components/AddItems';
import './styles/App.css';
import Home from './components/Home';

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
