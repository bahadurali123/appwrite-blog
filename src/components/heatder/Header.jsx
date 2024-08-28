import { useState } from "react";
import { LogoutBtn, Container, Logo } from "../index"
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // console.log("Menue Status", isMenuOpen);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className="py-3 shadow bg-cyan-50">
            <Container>
                <nav className="flex justify-between items-center md:flex-row">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width={`w-10 pl-2`} />
                        </Link>
                    </div>
                    <ul className={`md:flex flex-col md:flex-row md:space-x-4 text-center ${isMenuOpen ? '' : 'hidden'} `}>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}
                                    className="md:inline-block justify-center py-2 hover:bg-cyan-300 rounded-full">
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `inline-bock px-6 py-2 duration-200 ${isActive ? "text-red-800" : "text-cyan-950"} text-cyan-950 hover:text-red-800 rounded-full`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        ))}
                        {authStatus && (
                            <li className="md:inline-block hover:bg-cyan-300 rounded-full">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                    <div className="md:hidden flex items-center">
                        <button className="text-cyan-950 hover:text-red-800 focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="h-6 w-6"
                                viewBox="0 0 16 16"
                                onClick={handleMenuClick}
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;