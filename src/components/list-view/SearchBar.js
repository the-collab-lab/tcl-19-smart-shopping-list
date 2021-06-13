import { ReactComponent as ResetIcon } from '../img/reset.svg';

const SearchBar = ({ value, setValue, showDeleteModal }) => {
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
        className="input"
        type="text"
        placeholder="Search list.."
        value={value}
        onChange={handleChange}
        tabIndex={showDeleteModal ? -1 : 0}
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
