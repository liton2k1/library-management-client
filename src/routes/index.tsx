import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/pages/Home/Home";
import CreateBook from "@/pages/CreateBook/CreateBook";
import EditBook from "@/pages/EditBook/EditBook";
import BorrowBook from "@/pages/BorrowBook/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";

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
      {
        path: "/edit-book/:id",
        element: <EditBook />
      },
      {
        path: "/borrow-book/:bookId",
        element: <BorrowBook />,
      },

      {
        path: "/borrow-summary",
        element: <BorrowSummary />
      }
    ],
  },
]);

export default router;
