import React, { useState } from "react";
import { Alert, Button, ButtonGroup } from "react-bootstrap";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { AppRequest, User } from "../types";
import { RequestModal } from "./RequestModal";
import { Link } from "react-router-dom";
// import {  } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { requestService } = useServicesContext();
  const { user } = useSessionContext();
  // const history = useHistory();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const onConfirm = (request: AppRequest) => {
    requestService
      .saveRequest(request)
      .then((id) => {
        alert(`submitted request with id: ${id}`);
        setRequestSubmitted(true);
      })
      .catch((e) => console.log(e))
      .finally(() => setShowModal(false));
  };

  return (
    <>
      <Alert
        variant="success"
        onClose={() => setRequestSubmitted(false)}
        show={requestSubmitted}
        dismissible
      >
        Your request has succuessfully been submitted!
      </Alert>

      <RequestModal
        showModal={showModal}
        onConfirm={onConfirm}
        onCancel={() => setShowModal(false)}
      />

      <div>{getWelcomeText(user)}</div>
      <Button onClick={() => setShowModal(true)} className="mtr">
        Make a Request
      </Button>
      <div className="btn btn-primary mlr mtr">
        <Link to="/booking" className="link-button">
          Make a Booking
        </Link>
      </div>
    </>
  );
};

const getWelcomeText = (user: User | null) => {
  return user ? `Welcome ${user.name}` : "Welcome!";
};
