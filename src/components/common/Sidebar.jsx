import React, {useState} from 'react';
import {Link} from "react-router";
import {IoIosHome} from "react-icons/io";
import {FaBoxOpen, FaChevronLeft} from "react-icons/fa";
import {HiUsers} from "react-icons/hi";
import {NavLink} from "react-router/internal/react-server-client";
import clsx from "clsx";

function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <aside className={clsx("sidebar", {"open": isOpen})}>
            <header>
                <Link to="/">
                    <img src="/images/logo.png" className="website-logo" alt=""/>
                </Link>
            </header>
            <main className="side-menu">
                <ul className="side-container">
                    <li>
                        <NavLink to="/" className={clsx("navlink", ({isActive}) => isActive ? "active" : "")}>
                            <span className="navicon"><IoIosHome/></span>
                            <span className="title">داشبورد</span>
                        </NavLink>
                    </li>
                    {/*Products */}
                    <li>
                        <NavLink to="/courses" className={clsx("navlink", ({isActive}) => isActive ? "active" : "")}>
                            <span className="navicon"><FaBoxOpen/></span>
                            <span className="title">دوره ها</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/users" className={clsx("navlink", ({isActive}) => isActive ? "active" : "")}>
                            <span className="navicon"><HiUsers/></span>
                            <span className="title">کاربران</span>
                        </NavLink>
                    </li>
                </ul>
            </main>
            <footer></footer>
            <button onClick={toggleOpen} className="toggle-sidebar">
                {/*Arrow Right */}
                <FaChevronLeft/>
            </button>
        </aside>);
}

export default Sidebar;