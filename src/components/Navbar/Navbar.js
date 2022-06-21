import "./Navbar.css";
import { useHistory, Link } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#3bb19b" }}
    >
      <Link className="navbar-brand btns2" style={{ fontFamily: "Cursive" }}to="/homepage/">
        EZ Programming
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link btns2" to="/mycodes">
              Saved Codes <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link btns2" to="/codesnippets">
              Code Snippets <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <button
          title="Terminate session"
            className="btn btn-light my-2 my-sm-0"
            style={{ color: "#123d35" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
  {
    /* <nav className="navbar" style={{backgroundColor: "#3bb19b"}}>
      <div >
        <h2>EZ Programming</h2>
        <Link to="/mycodes">
          <h3>My Codes</h3>
        </Link>
      </div>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </nav> */
  }
};

export default Navbar;
