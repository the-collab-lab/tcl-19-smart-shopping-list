import React from 'react';

const SearchBar = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const clearText = (event) => {
    event.preventDefault();
    setValue('');
  };

  return (
    <div className="flex mx-2">
      <input
        className="py-3 px-2 border rounded-lg py-2 text-gray-900
      focus:shadow-outline focus:bg-blue-100 placeholder-gray-400 w-full"
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          className="bg-gray-800 py-2 px-4 rounded-lg text-gray-100 ml-1 shadow-md"
          type="reset"
          onClick={clearText}
          value="Reset"
        >
          X
        </button>
      )}
    </div>
  );
};

export default SearchBar;
