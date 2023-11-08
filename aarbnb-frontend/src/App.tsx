import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header } from './layouts/Header';
import { RequestPage } from './routes/RequestPage';
import { HttpClient } from './services/httpClient';
import { RestApplicationClient } from './services/requestService';
import './styles/App.scss';
import { HostPage } from './routes/HostPage';
import { HomePage } from './layouts/HomePage';

const restApplicationClient = new RestApplicationClient(new HttpClient());

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage
      requestService={restApplicationClient}
    />,
  },
  {
    path: "/host",
    element: <HostPage requestService={restApplicationClient} />
  }
]);

function App() {
  return <>
    <div className="App-header">
      <Header />
    </div>
    <div className="App-container">
      <RouterProvider router={router} />
    </div>
  </>
}

export default App;
