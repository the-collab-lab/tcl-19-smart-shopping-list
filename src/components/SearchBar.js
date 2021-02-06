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
    <div>
      <input
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
      />
      {value ? (
        <button type="reset" onClick={clearText} value="Reset">
          X
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
