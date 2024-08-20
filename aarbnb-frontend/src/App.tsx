import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ServicesContextProvider } from "./context/ServicesContext";
import { useSessionContext } from "./context/SessionContext";
import { Header } from "./layouts/Header";
import { HomePage } from "./layouts/HomePage";
import { LoginPage } from "./layouts/LoginPage";
import { BookingPage, HostPage } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/host",
    element: <HostPage />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
]);

function App() {
  const { token } = useSessionContext();

  return (
    <ServicesContextProvider token={token}>
      <Header />
      <div className="py-4 px-48 text-center bg-stone-100 h-screen flex flex-col">
        {token != null ? <RouterProvider router={router} /> : <LoginPage />}
      </div>
    </ServicesContextProvider>
  );
}

export default App;
