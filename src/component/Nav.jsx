import React from 'react';
import {Link} from "react-router-dom";
import Button from "./button.jsx";

const Nav = () => {
    return (
        <>
            <nav className="navbar p-6 fixed top-0 right-0 left-0 z-10">
                <div className="nav-bar container ml-auto mr-auto flex justify-between items-center bg-white rounded-full pt-4 pb-4 pl-5 pr-5">
                    <div className={"logoWrapper flex justify-center align-items-center h-fit"}>
                        <Link to="/"> <img src="/images/logo 01.svg" alt="" /></Link>
                    </div>
                    <div className={" NavLink flex justify-center align-items-center gap-5 container h-fit"}>
                         <Link className={"h-fit"} to={"/"}>Table</Link>
                         <Link to={"/Login"} className={"h-fit"}>Login</Link>
                         <Link to={"/Login"} className={"h-fit"}>Sign Up</Link>
                    </div>
                    <Link to={"/contact"}> <Button title="Contact"></Button></Link>
                </div>
            </nav>
        </>
    );
};

export default Nav;