import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <>
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href="index.html"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                       E-Admin 
                    </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <NavLink className={ ({ isActive}) =>isActive ? "active nav-link " : " nav-link "} to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

            

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">Data</div>


                <li className="nav-item">
                    <NavLink  className={ ({ isActive}) =>isActive ? "active nav-link " : " nav-link "} to="/category">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Category</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/product">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Product</span>
                    </Link>
                </li>


            </ul>
        </>
    );
};

export default SideBar;
