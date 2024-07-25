import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "../pages/include/client/NavBar";
import "bootstrap/dist/css/bootstrap.css"
import Home from "../pages/client/Home";

import {store} from '../state/store'
import {Provider} from "react-redux"
import Cart from "../pages/client/Cart"

const router = createBrowserRouter([
  {
    path: "/client",
    element: <NavBar />,
    children : [
        {
            path: "/client",
            element: <Home />
        },
        {
          path: "/client/cart",
          element: <Cart />
      },
    ]
  },
]);

const ClientLayout = () => {
  return (
    <>
       <Provider store={store}>
       <RouterProvider router={router} />
       </Provider>
    </>
  );
};

export default ClientLayout;
