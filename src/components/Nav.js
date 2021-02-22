import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TaskIcon } from '../img/tasks-solid.svg';
import { ReactComponent as AddIcon } from '../img/plus-solid.svg';

const Nav = () => {
  return (
    <div className="md:hidden">
      <nav className="h-auto fixed bottom-0 right-0 left-0">
        <ul className="flex justify-center content-center fixed bottom-0 right-0 left-0 bg-green-500 rounded-t-3xl shadow-top">
          <li className="list-none mr-8 py-2">
            <NavLink to="/list" a>
              <button
                title="Go to list view"
                className="rounded-full h-20 w-20 flex items-center justify-center bg-green-700 text-gray-100 shadow-xl focus:ring-4 focus:ring-green-200 focus:ring-opacity-50 focus:outline-none"
              >
                <TaskIcon />
              </button>
            </NavLink>
          </li>
          <li className="list-none ml-8 py-2">
            <NavLink to="/addItem">
              <button
                title="Go to add items view"
                className="rounded-full h-20 w-20 flex items-center justify-center bg-green-700 text-gray-100 shadow-xl focus:ring-4 focus:ring-green-200 focus:ring-opacity-50 focus:outline-none"
              >
                <AddIcon />
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
