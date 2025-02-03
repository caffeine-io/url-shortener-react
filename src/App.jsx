import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createShortUrlAction, redirectLoader } from "./lib/loader";

import "./App.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    action: createShortUrlAction,
  },
  {
    path: "/:shortId",
    element: <Redirect />,
    errorElement: <Error />,
    loader: redirectLoader,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
