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
      <div className="mb-4 flex justify-between">
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="bg-green-700 text-gray-100 py-3 px-4 flex items-center rounded-lg"
        >
          <span className="mr-2">
            <ArrowLeft />
          </span>
          Back to Home
        </button>
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="bg-green-700 text-gray-100 py-3 px-4 flex items-center rounded-lg"
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
