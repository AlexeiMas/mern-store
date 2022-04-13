import React, {FC, SetStateAction} from 'react';
import {Button, Modal} from "react-bootstrap"

export type TAdminConfirm = {
  title: string,
  message?: string,
  variant?: "success" | "danger"
  show: boolean,
  setShow: React.Dispatch<SetStateAction<boolean>>
  confirmed: React.Dispatch<SetStateAction<boolean>>
}

const AdminConfirm: FC<TAdminConfirm> = ({show, setShow, title, message, variant = "danger", confirmed}) => {

  const handleConfirm = () => {
    confirmed(true)
    setShow(false)
  }

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {message && <Modal.Body>{message}</Modal.Body>}
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleConfirm}>OK, I'm agree</Button>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel, I'm disagree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminConfirm;
