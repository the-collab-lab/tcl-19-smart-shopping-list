import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../img/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../img/arrow-left.svg';

function AddItemButton(props) {
  const history = useHistory();

  const handleRedirectToAddItem = () => {
    history.push('/additem');
  };
  return (
    <div className="hidden md:block">
      <div className="mb-4 flex justify-around">
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="nav-btn hidden"
          tabIndex={props.showDeleteModal ? -1 : 0}
        >
          <span className="mr-2">
            <ArrowLeft />
          </span>
          Back to Home
        </button>
        <button
          type="submit"
          onClick={handleRedirectToAddItem}
          className="nav-btn"
        >
          Add an Item
          <span className="ml-2">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default AddItemButton;
