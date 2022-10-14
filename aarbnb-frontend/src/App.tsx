import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './styles/App.scss';
import { Header } from './layouts/Header';
import { RequestModal } from './layouts/RequestModal';
import { AppRequest } from './types/types';
import { RestApplicationClient } from './services/requestService';
import { HttpClient } from './services/httpClient';

const requestService = new RestApplicationClient(new HttpClient());

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <div className="App-container">
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
        </div>
      </body>
    </div>
  );
}

export default App;
