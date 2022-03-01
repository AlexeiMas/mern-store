import React, {FC} from 'react';
import {Modal} from 'react-bootstrap';

export type TCrudModal = {
  title: string
  show: boolean
  onHide: () => void
}

const CrudModal: FC<TCrudModal> = (
  {
    children,
    title,
    show,
    onHide
  }) => {
  const modalTitle = title.replace('CRUD', '').trim().slice(0, -1)

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create new {modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CrudModal;
