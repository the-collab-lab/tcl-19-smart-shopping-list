import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TaskIcon } from '../img/tasks-solid.svg';
import { ReactComponent as AddIcon } from '../img/plus-solid.svg';

const Nav = () => {
  return (
    <div>
      <div className="md:hidden">
        <nav className="h-auto fixed bottom-0 right-0 left-0">
          <ul className="flex justify-center content-center fixed bottom-0 right-0 left-0 m-auto bg-green-300 rounded-t-3xl shadow-top">
            <li className="list-none mr-8 py-2">
              <NavLink to="/list" activeClassName="font-bold">
                <button
                  class="rounded-full h-20 w-20 flex items-center justify-center bg-green-600 text-white shadow-xl"
                  aria-label="Go to list"
                >
                  <TaskIcon />
                </button>
              </NavLink>
            </li>
            <li className="list-none ml-8 py-2">
              <NavLink to="/addItem" activeClassName="font-bold">
                <button
                  class="rounded-full h-20 w-20 flex items-center justify-center bg-green-600 text-white shadow-xl"
                  aria
                  label="Go to Add Item"
                >
                  <AddIcon />
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
