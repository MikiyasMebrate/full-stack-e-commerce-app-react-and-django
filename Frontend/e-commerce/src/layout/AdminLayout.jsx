import Category from "../Pages/Admin/Categories.jsx";
import Index from "../Pages/Admin/Index.jsx";
import "../assets/Admin/vendor/fontawesome-free/css/all.min.css"
import "../assets/Admin/css/sb-admin-2.min.css";


import HeadNav from "../components/ui/HeadNav.jsx";
import { createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HeadNav />,
        children : [
            {
                path: '/',
                element: <Index />
            },
            {
                path : 'category/',
                element : <Category />
            },
        ]
    }
])

const AdminLayout = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
};

export default AdminLayout;
