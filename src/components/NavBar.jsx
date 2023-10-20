import "./NavBar.css";

const NavBar = () => {
    return(
        <div className="nav-bar">
            <h4 className="navbar-dashboard"><a href=""> 🥬 Dashboard</a></h4>
            <h4 className="navbar-search"><a href="">🍅 Search</a></h4>
            <h4 className="navbar-about"><a href=""> 🥗 About</a></h4>
        </div>
    );

};

export default NavBar;