import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

const HeadNav = () => {
    return (
        <>
        <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                 <Header />

                 
                 <div className="container-fluid">
                    <Outlet />
                 </div>

                
            </div>

            <Footer />
        </div>
      </div>
        </>
    );
}
 
export default HeadNav;