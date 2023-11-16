import React, { useState } from 'react';
import { Modal } from '../../context/Modal2';
import DeleteOwnedServer from '../ServerDelete';

function DeleteButtonModal({serverId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>D</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteOwnedServer setShowModal={setShowModal} serverId={serverId}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteButtonModal;
