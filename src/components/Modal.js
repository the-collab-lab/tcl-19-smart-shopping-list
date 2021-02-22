import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = (props) => {
  return (
    <div className={!props.active ? 'hidden' : null}>
      <div className="style-modal bg-green-500">
        <p>{props.message}</p>
        <button onClick={props.removeModal}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
