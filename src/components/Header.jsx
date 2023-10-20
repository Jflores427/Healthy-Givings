import "./Header.css";

const Header = (props) => {
    const { headerLogo, headerTitle} = props;
    
    return(
        <div className="header">
            <img src={headerLogo}></img>
            <h1 className="header-title">{headerTitle}</h1>
        </div>
    );
};

export default Header;