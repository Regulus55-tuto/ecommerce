import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AdminEdit,
  AdminList,
  AllProducts,
  Collections,
  ForgotEmail,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  ProductDetail,
  Signup,
} from "./pages";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminAdd from "pages/Admin/AdminAdd";
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
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/product/new",
        element: <AdminList />,
      },
      {
        path: "/product/add/:id",
        element: <AdminAdd />,
      },
      {
        path: "/product/edit/:id",
        element: <AdminEdit />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/change/password",
        element: <ChangePassword />,
      },
    ],
  },
]);

export default router;
