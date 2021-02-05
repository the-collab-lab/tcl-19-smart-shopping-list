import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
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
      {searchTerm ? (
        <button type="reset" onClick={clearText} value="Reset">
          X
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
