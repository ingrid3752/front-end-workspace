import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Daily from "./pages/Daily";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/daily",
    element: <Daily />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

export default router;
