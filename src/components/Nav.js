import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav() {
  return (
    <nav>
      <ul className="flexed-list">
        <li className="list">
          <NavLink to="/list" activeClassName="active">
            List
          </NavLink>
        </li>
        <li className="list">
          <NavLink to="/addItem" activeClassName="active">
            Add Item
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
