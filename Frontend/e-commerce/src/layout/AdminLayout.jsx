import "../assets/admin/css/app.min.css";
import Index from "../pages/admin/index.jsx";
import "../assets/admin/fonts/anticon.ttf";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeadNav from "../components/ui/Admin/HeadNav.jsx";
import Category from "../pages/admin/Category.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeadNav />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path : "category/",
        element : <Category />
      }
    ],
  },
]);

const AdminLayout = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AdminLayout;
