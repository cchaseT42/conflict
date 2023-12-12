import React, { useState } from 'react';
import { Modal } from '../../context/realModal';
import CreateNewServer from '../ServerCreate/index'

function CreateServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='leave_review_btn' onClick={() => setShowModal(true)}>++</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNewServer setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateServerModal;