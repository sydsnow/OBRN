//import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
//import "../scss/components/_modal.scss";

function ModalComponent({ isOpen, onRequestClose, description, closeModal, businessName }) {
  // Define custom styles for the modal
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     //backgroundColor: 'rgb(243, 242, 242)',
//     backgroundColor: 'white',
//     width: '80%',
//     fontFamily: 'Mulish',
//     height: '400px',
//   },
//   button: {
//     marginTop: '20px',
//     backgroundColor: 'black',
//     color: 'white',
//     border: 'none',
//     padding: '6px 15px',
//     borderRadius: '5px',
//   },
//   div: {
//     height: '240px',
//     overflowY: 'auto',
//     fontSize: '0.9rem',
//   }
// };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      width: '80%',
      maxWidth: '600px', // Adjust the maximum width if needed
      fontFamily: 'Mulish',
    },
    button: {
      marginTop: '20px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      padding: '6px 15px',
      borderRadius: '5px',
    },
    div: {
      maxHeight: '240px', // Adjust the maximum height of the content container
      overflowY: 'auto',
      fontSize: '0.9rem',
      wordWrap: 'break-word', // Ensure long words wrap to prevent horizontal overflow
    }
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
      <h2>{businessName}</h2>
      <div style={customStyles.div}>{description}</div>
      <button style={customStyles.button} onClick={closeModal}>Close</button>
    </Modal>
  );
}

ModalComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    businessName: PropTypes.string.isRequired,
};

export default ModalComponent;
