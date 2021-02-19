import React from 'react';
import { useHistory } from 'react-router-dom';

function AddItemButton() {
  const history = useHistory();

  const handleRedirectToAddItem = () => {
    history.push('/additem');
  };
  return (
    <div className="hidden md:block">
      <div className="fixed bottom-12 right-1/4">
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="btn-bg flex items-center border py-3 px-3 hover:bg-green-300 justify-center rounded-md bg-green-600 text-white w-40"
        >
          <span className="mr-4">Add an Item</span>
          <span>
            <svg
              width="13"
              height="15"
              viewBox="0 0 15 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.414978 18L13.4099 8.55556L0.414978 1"
                stroke="white"
              />
            </svg>
          </span>
          <span>
            <svg
              width="13"
              height="15"
              viewBox="0 0 15 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.414978 18L13.4099 8.55556L0.414978 1"
                stroke="white"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default AddItemButton;
