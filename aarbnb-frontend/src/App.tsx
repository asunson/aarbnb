import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './layouts/Header';
import { HomePage } from './layouts/HomePage';
import { HostPage } from './layouts/HostPage';
import { HttpClient } from './services/httpClient';
import { RestApplicationClient } from './services/requestService';
import './styles/App.scss';

const restApplicationClient = new RestApplicationClient(new HttpClient());

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage
        requestService={restApplicationClient}
      />,
    },
    {
      path: "/host",
      element: <HostPage requestService={restApplicationClient}/>
    }
  ]);

  return <div className="App">
    <header className="App-header">
      <Header />
    </header>
    <body>
      <div className="App-container">
        <RouterProvider router={router} />
      </div>
    </body>
  </div>
}

export default App;
