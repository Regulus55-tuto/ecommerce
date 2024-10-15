import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AdminPage,
  AllProducts, Collections,
  ForgotEmail,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  ProductDetail,
  Signup,
} from "./pages";
import ChangePassword from "./pages/Auth/ChangePassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot/email",
        element: <ForgotEmail />,
      },
      {
        path: "/forgot/password",
        element: <ForgotPassword />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/Products/:id",
        element: <ProductDetail />,
      },
      {
        path: '/Product/new',
        element: <AdminPage/>
      },
      {
        path: '/collections',
        element: <Collections/>
      },
      {
        path: '/change/password',
        element: <ChangePassword/>
      }
    ],
  },
]);

export default router;
