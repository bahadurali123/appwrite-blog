import logo from "../assets/react_web_logo.png"

function Logo({ width }) {
    return <img
        className={width}
        src={logo}
        alt="logo" />;
}

export default Logo