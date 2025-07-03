import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/pages/Home/Home";
import CreateBook from "@/pages/CreateBook/CreateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-book",
        element: <CreateBook />,
      },
    ],
  },
]);

export default router;
