import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../img/arrow-right.svg';

function AddItemButton(props) {
  const history = useHistory();

  const handleRedirectToAddItem = () => {
    history.push('/additem');
  };
  return (
    <div className="hidden md:block">
      <div className="fixed bottom-12 right-1/4">
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="btn-bg flex items-center border py-3 px-3 hover:shadow-hover justify-center rounded-md bg-green-600 text-white w-40"
          tabIndex={props.showDeleteModal ? -1 : 0}
        >
          <span className="mr-4">Add an Item</span>
          <ArrowRight />
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default AddItemButton;
