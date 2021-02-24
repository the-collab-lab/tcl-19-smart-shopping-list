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
        className="w-full py-3 px-2 border rounded-lg text-gray-900
      focus:bg-green-100 placeholder-gray-400 focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none"
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          className="bg-green-700 py-2 px-3 ml-1 rounded-lg text-gray-100 hover:bg-green-500 focus:outline-none"
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
