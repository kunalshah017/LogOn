import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import axios from "axios";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleDelete = () => {
        axios.post("http://localhost:3000/api/auth/delete-account",
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response);
                if (response.data.status !== "success") return;
                localStorage.removeItem("token");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div
                className="
                flex
                justify-between
                items-center
                bg-gray-800
                bg-opacity-90
                text-white
                text-3xl
                font-bold
                p-4
                fixed
                top-0
                w-full
                "
            >
                <Link to="/">
                    <div>LogOn</div>
                </Link>

                <div className="flex gap-5">
                    {location.pathname !== "/" && location.pathname !== "/main" && (
                        <Link to="/" className=" h-10 w-20 flex justify-center items-center bg-blue-500 text-white text-sm rounded hover:bg-blue-700">
                            Home
                        </Link>
                    )}

                    {location.pathname === "/main" && (
                        <>
                            <div
                                className="h-10 w-20 flex justify-center items-center bg-blue-500 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                            <div className=" h-10 w-40 flex justify-center items-center bg-red-500 text-white text-sm rounded hover:bg-red-700 cursor-pointer font-extrabold "
                                onClick={handleDelete}
                            >
                                Delete Account
                            </div>
                        </>
                    )}

                    {location.pathname !== "/main" && !localStorage.getItem("token") && (
                        <Authentication />
                    )}

                    {location.pathname !== "/main" && localStorage.getItem("token") && (
                        <Link to="/main" className=" h-10 w-20 flex justify-center items-center bg-blue-500 text-white text-sm rounded hover:bg-blue-700">
                            Main
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default NavBar;