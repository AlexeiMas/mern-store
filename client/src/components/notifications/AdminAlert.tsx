import React, {FC, SetStateAction} from 'react';
import {Alert, Button} from "react-bootstrap"

export type TAdminAlert = {
  title: string,
  message?: string,
  variant?: "success" | "danger"
  show: boolean,
  setShow: React.Dispatch<SetStateAction<boolean>>
}

const AdminAlert: FC<TAdminAlert> = ({show, setShow, title, message, variant = "success"}) => {
  return (
    <>
      <Alert show={show} variant={(variant && variant === "success") ? "success" : "danger"} className="w-50 position-absolute top-50 start-50" style={{transform: "translate(-50%, -50%)"}}>
        <Alert.Heading>{title}</Alert.Heading>
        {message && <p>{message}</p>}
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            {variant === "success" ? "OK, thanks" : "Well, try again"}
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default AdminAlert;
