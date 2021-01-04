import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/list" activeClassName="active">
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/addItem" activeClassName="active">
              Add Item
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
