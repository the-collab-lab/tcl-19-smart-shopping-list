import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../img/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../img/arrow-right.svg';

function ItemListButton(props) {
  const history = useHistory();

  const handleRedirectToList = () => {
    history.push('/list');
  };
  return (
    <div className="hidden md:block">
      <div className="mb-4 flex justify-around">
        <button
          type="submit"
          onClick={handleRedirectToList}
          className="nav-btn"
          tabIndex={props.showModal ? -1 : 0}
        >
          <span className="mr-2">
            <ArrowLeft />
          </span>
          Go to list
        </button>
        <button type="submit" className="nav-btn hidden" >
          Back to Home
          <span className="ml-2">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ItemListButton;
