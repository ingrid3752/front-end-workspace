// 기능만 제공하면 소문자 시작, 컴포넌트는 대문자 시작
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "create", element: <Create /> },
    ],
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);
export default router;

/* 라우터 6버전 전의 예전 방식
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
*/
