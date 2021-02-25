import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../img/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../img/arrow-left.svg';

function AddItemButton() {
  const history = useHistory();

  const handleRedirectToAddItem = () => {
    history.push('/additem');
  };
  return (
    <div className="hidden md:block">
      <div className="mb-4 flex justify-around">
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="bg-blue-600 text-gray-100 w-40 py-3 flex items-center rounded-lg justify-center shadow-bottom font-light hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          <span className="mr-2">
            <ArrowLeft />
          </span>
          Back to Home
        </button>
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="bg-blue-600 text-gray-100 w-40 py-3 flex items-center rounded-lg justify-center shadow-bottom font-light hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Add an Item
          <span className="ml-2">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default AddItemButton;
