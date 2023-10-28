import "./Header.css";

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Header = (props) => {
    const { headerLogo, headerTitle} = props;
    
    return(
        <div className="health-container">
            <div className="header-container">
                <div className="header">
                    <img src={headerLogo}></img>
                    <h1 className="header-title">{headerTitle}</h1>
                </div>
                <NavBar />
            </div>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </div>
        
    );
};

export default Header;