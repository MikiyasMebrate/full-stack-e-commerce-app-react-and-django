import { Link, Outlet } from "react-router-dom";
import { useSelector} from "react-redux"


const NavBar = () => {
  const cart = useSelector((state) => state.cart.item)

  let value = 0
  for(let item of cart){
    value+=item.quantity
  }
 
    return (
      <>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/client">
                E-commerce
              </Link>
             
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <div className="d-flex">
                  <Link
                    to="/client/cart"
                    className="nav-link"
                    tabindex="-1"
                  >
                    <button
                      type="button"
                      className="btn btn-primary position-relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-cart-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {value}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <Outlet />
      </>
    );
  };
  
  export default NavBar;