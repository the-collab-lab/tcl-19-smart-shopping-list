import React from 'react';

export default function Modal({ message, showModal, setShowModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div
            role="dialog"
            aria-label="alertdialog"
            aria-modal="true"
            aria-describedby="dialog-message"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    <span className=" text-red h-6 w-6 text-2xl block">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto w-72">
                  <p
                    className="my-4 text-gray-600 text-lg leading-relaxed"
                    id="dialog-message"
                  >
                    {message}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-green-700 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    OK
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
