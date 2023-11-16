import React, { useState } from 'react';
import { Modal } from '../../context/Modal2';
import DeleteOwnedServer from '../ServerDelete';

function DeleteButtonModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>D</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteOwnedServer setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteButtonModal;
