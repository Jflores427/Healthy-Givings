import { Link } from "react-router-dom"
import "./NavBar.css";

const NavBar = () => {
    return(
        <div className="nav-bar">
            <Link to="/" className="navbar-dashboard"> <h3> 🥬 Dashboard</h3></Link>
            <Link to="/" className="navbar-search"><h3 href="">🍅 Search</h3></Link>
            <Link to="/"className="navbar-about"><h3 href=""> 🥗 About</h3></Link>
        </div>
    );

};

export default NavBar;