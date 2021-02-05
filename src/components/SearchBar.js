import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearText = (event) => {
    event.preventDefault();
    setSearchTerm('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search list.."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="reset" onClick={clearText} value="Reset">
        X
      </button>
    </div>
  );
};

export default SearchBar;
