import Topnav from "./TopNav";
import Nav from "./Nav";
import "../scss/components/_header.scss";

function Header() {
    return (
        <header className="header">
            <Topnav />
            <Nav />
        </header>
    )
}

export default Header;