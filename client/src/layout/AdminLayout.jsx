//styles
import "../assets/Admin/vendor/fontawesome-free/css/all.min.css";
import "../assets/Admin/css/sb-admin-2.min.css";




import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "../pages/Home"
import HeadNav from "../pages/include/HeadNav"
import Category from "../pages/Category";
import Product from "../pages/Product";

//redux
import {store} from '../state/store'
import {Provider} from "react-redux"



const router = createBrowserRouter([
  {
    path: "/",
    element: <HeadNav />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "category/",
        element: <Category />,
      },
      {
        path : "product/",
        element : <Product />
      }
    ],
  },
]);

const AdminLayout = () => {
  return(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
};

export default AdminLayout;
