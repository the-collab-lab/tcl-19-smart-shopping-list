import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../img/arrow-left.svg';

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
          <ArrowLeft />
          <ArrowLeft />
          <span className="ml-4">Go to list</span>
        </button>
      </div>
    </div>
  );
}

export default ItemListButton;
