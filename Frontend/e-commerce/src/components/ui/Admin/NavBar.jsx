import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="side-nav">
        <div className="side-nav-inner">
          <ul className="side-nav-menu scrollable">
            <li className="nav-item dropdown open">
              <NavLink  className={({ isActive, isPending }) =>
                   isActive ? "text-success" : ""
                  } to="/">
                <span className="icon-holder">
                  <i className="anticon anticon-dashboard"></i>
                </span>
                <span className="title">Dashboard</span>
                <span className="arrow">
                  <i className="arrow-icon"></i>
                </span>
              </NavLink>


              <ul className="dropdown-menu">

                <li>

                  <NavLink className={({ isActive, isPending }) =>
                   isActive ? "text-success" : ""
                  } to="/category">Category</NavLink>


                </li>


                <li >
                  <NavLink className={({ isActive, isPending }) =>
                    isActive ? "text-success" : ""
                  } to="/product">Product</NavLink>

                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
