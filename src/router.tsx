import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllProducts,
  ForgotEmail,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  ProductDetail,
  Signup,
} from "./pages";
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
        path: "/product/detail",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
