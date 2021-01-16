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
      </Switch>
      {localStorage.getItem('newToken') ? <Redirect to="/list" /> : <Home />}
    </div>
  );
}

export default App;
