import React from 'react';
import Modal from 'react-modal';

const CustomModal2 = ({ isOpen, onClose, title, paragraph, confirmText, cancelText, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnEsc={true} className="custom-modal" overlayClassName="custom-modal-overlay">
      <button className="cerrar_modal" onClick={onClose}>x</button>
      <div className="contenedor_modal">
        <h1 className='title_modal'>{title}</h1>
        <p className='paragraph_modal'>{paragraph}</p>
        <div className="button-container">
          {confirmText && onConfirm && (
            <button className='button_modal confirm-button mini' onClick={onConfirm}>
              {confirmText}
            </button>
          )}
          &nbsp;&nbsp;&nbsp;
          {cancelText && onCancel && (
            <button className='button_modal cancel-button mini' onClick={onCancel}>
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal2;
