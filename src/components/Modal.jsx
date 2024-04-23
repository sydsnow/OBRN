//import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import "../scss/components/_modal.scss";

function ModalComponent({ isOpen, onRequestClose, description, closeModal }) {
  // Define custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(243, 242, 242)'
  },
};
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={customStyles}
      // className="modal-content"
    >
      {/* Modal content */}
      <h2>Testimonial</h2>
      <div>{description}</div>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}

ModalComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default ModalComponent;
