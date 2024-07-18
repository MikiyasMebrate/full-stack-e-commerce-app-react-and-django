import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";

const HeadNav = () => {
  return (
    <>
      <div class="app">
        <div class="layout">

          <NavBar />
          <Header />
        
          <div className="page-container">
            <div className="main-content">
             <Outlet />
            </div>
          
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HeadNav;
