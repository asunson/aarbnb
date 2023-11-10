import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { RequestModal } from "../layouts/RequestModal";
import { RestApplicationClient } from "../services/restApplicationClient";
import { AppRequest } from "../types";

interface RequestPageProps {
    requestService: RestApplicationClient
}

export const RequestPage: React.FC<RequestPageProps> = (props) => {
    const { requestService } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

    const onConfirm = (request: AppRequest) => {
        requestService.saveRequest(request)
            .then(id => {
                alert(`submitted request with id: ${id}`);
                setRequestSubmitted(true);
            })
            .catch(e => console.log(e))
            .finally(() => setShowModal(false))
    };

    return <>
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

        <Button onClick={() => setShowModal(true)} className="mtr">
            Make a Request
        </Button>
    </>
}