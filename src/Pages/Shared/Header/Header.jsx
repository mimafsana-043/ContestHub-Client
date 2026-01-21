import { useContext, useEffect, useState } from "react";
import { FaMoon, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../../../Provider/AuthProvider";
const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Succesfully Logged Out!",
                icon: "success",
                draggable: true
            });
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    const handleToggle = () => {
        if (theme == 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        <li><Link to={'/'}> Home</Link></li>

                        <li>
                            <a>Information</a>
                            <ul className="p-2">
                                <li><Link to={'/all'}>All Contests</Link></li>
                                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                {user && user.email && <li><Link to={'/dashboard/mycontests'}>My Contests</Link></li>}
                            </ul>
                        </li>
                        <li><a>About Us</a></li>
                    </ul>
                </div>
                <a className="text-lg md:text-xl lg:text-2xl font-bold text-primary">BattleOfBrains</a>
            </div>
            <div className="navbar-center flex sm:hidden  text-primary">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/'} className="">Home</Link></li>
                    <li>
                        <details>
                            <summary>Information</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <li><Link to={'/all'}>All Contests</Link></li>
                                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                {user && user.email && <li><Link to={'/dashboard/mycontests'}>My Contests</Link></li>}
                            
                            </ul>
                        </details>
                    </li>
                    <li><a>About Us</a></li>
                    <button onClick={handleToggle} className="">
                        <FaMoon size={24} className="text-gray-700" />

                    </button>
                </ul>
            </div>
            <div className="navbar-end gap-2 md:gap-3">
                {user ? (<button onClick={handleLogOut} className="px-3 py-2 md:px-5 md:py-2 text-sm md:text-base rounded-md bg-primary text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                    LogOut
                </button>) : (
                    <button className="px-3 py-2 md:px-5 md:py-2 text-sm md:text-base rounded-md bg-primary text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                        <Link to="/login"> Login</Link>
                    </button>
                )}

                {/* Theme Toggle (optional later) */}



                {/* User Profile */}
                <div className="dropdown dropdown-end">

                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        {user && user.photoURL ? (
                            <div className="w-10 rounded-full">

                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-full"
                                />
                            </div>
                        ) : (
                            <FaUserCircle className="text-3xl " />
                        )
                        }

                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
                    >
                        <li className="text-sm font-semibold px-2 py-1">
                            {user && user.displayName ? user.displayName : 'Guest'}
                        </li>
                        <li className="text-sm font-semibold px-2 py-1">
                            {user && user.email ? user.email : 'Guest User'}
                        </li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><button onClick={handleLogOut}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;