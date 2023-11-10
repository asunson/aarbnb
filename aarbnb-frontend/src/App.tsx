import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ServicesContextProvider } from "./context/ServicesContext";
import { useSessionContext } from "./context/SessionContext";
import { Header } from "./layouts/Header";
import { HomePage } from "./layouts/HomePage";
import { LoginPage } from "./layouts/LoginPage";
import { HostPage } from "./routes/HostPage";
import "./styles/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/host",
    element: <HostPage />,
  },
]);

function App() {
  const { token } = useSessionContext();

  return (
    <ServicesContextProvider token={token}>
      <Header />
      <div className="App-container">
        {token != null ? <RouterProvider router={router} /> : <LoginPage />}
      </div>
    </ServicesContextProvider>
  );
}

export default App;
