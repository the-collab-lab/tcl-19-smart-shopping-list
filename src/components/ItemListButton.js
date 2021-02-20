import React from 'react';
import { useHistory } from 'react-router-dom';

function ItemListButton() {
  const history = useHistory();

  const handleRedirectToList = () => {
    history.push('/list');
  };
  return (
    <div className="hidden md:block">
      <div className="fixed bottom-12 left-1/4">
        <button
          type="submit"
          onClick={handleRedirectToList}
          className="btn-bg flex items-center border py-3 px-3 hover:shadow-hover justify-center rounded-md bg-green-600 text-white w-36"
        >
          <span>
            <svg
              width="13"
              height="15"
              viewBox="0 0 15 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9517 0.99173L1.00558 10.5098L14.0483 17.9915"
                stroke="white"
              />
            </svg>
          </span>
          <span className="">
            <svg
              width="13"
              height="15"
              viewBox="0 0 15 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9517 0.99173L1.00558 10.5098L14.0483 17.9915"
                stroke="white"
              />
            </svg>
          </span>
          <span className="ml-4">Go to list</span>
        </button>
      </div>
    </div>
  );
}

export default ItemListButton;
