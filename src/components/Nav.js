import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ListButton } from '../img/list-button.svg';
import { ReactComponent as AddItemButton } from '../img/add-item-button.svg';

const Nav = () => {
  return (
    <div>
      <div className="md:hidden">
        <nav className="h-auto fixed bottom-0 right-0 left-0">
          <ul className="flex justify-center content-center fixed bottom-0 right-0 left-0 m-auto bg-green-300 rounded-t-3xl shadow-top">
            <li className="list-none mr-8">
              <NavLink to="/list" activeClassName="font-bold">
                <ListButton />
              </NavLink>
            </li>
            <li className="list-none ml-8">
              <NavLink to="/addItem" activeClassName="font-bold">
                <AddItemButton />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
