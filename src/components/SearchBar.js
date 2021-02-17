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
    <div className="relative">
      <input
        className="border rounded py-2 text-gray-700
      focus:shadow-outline focus:bg-blue-100 placeholder-indigo-400"
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          className="absolute mt-2"
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
