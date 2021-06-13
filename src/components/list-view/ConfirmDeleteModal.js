export default function ConfirmDeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  deleteItemFromShoppingList,
  itemToDelete,
}) {
  const handleDelete = () => {
    deleteItemFromShoppingList(itemToDelete);
    setShowDeleteModal(false);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    document.getElementById(`${itemToDelete}focus`).focus();
  };

  return (
    <>
      {showDeleteModal ? (
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="confirm delete"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={cancelDelete}
                  >
                    <span className=" text-red h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    {`Are you sure you want to delete ${itemToDelete} from the shopping list?`}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-gray-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={cancelDelete}
                  >
                    CANCEL
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={handleDelete}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
