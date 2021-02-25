import React from 'react';
import { ReactComponent as ResetIcon } from '../img/reset.svg';

const SearchBar = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const clearText = (event) => {
    event.preventDefault();
    setValue('');
  };

  return (
    <div className="flex mx-2 py-2">
      <input
        aria-label="Search list for item"
        className="w-full py-3 px-2 border border-gray-400 rounded-lg focus:bg-yellow-100 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          className="bg-yellow-400 py-2 px-3 ml-1 rounded-lg text-gray-100 hover:bg-yellow-300 focus:outline-none"
          type="reset"
          onClick={clearText}
          value="Reset"
        >
          <ResetIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
