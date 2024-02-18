import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignIn from "./SignInModal";

const PublicNavbar = () => {
    const location = useLocation();
    const isActive = (pathname) => location.pathname === pathname;
    const [openModal, setOpenModal] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleSubMenuToggle = () => {
        setShowSubMenu(!showSubMenu);
    };
    const handleSignInModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="flex justify-between mb-4 mx-6">
            <div>
                <Link
                    to="/"
                    className={`text-black text-xl px-4 mx-2 rounded transition duration-200 ${isActive("/") ? "font-bold pointer-events-none" : "hover:text-white"}`}
                >
                    Home
                </Link>
                <div className="relative inline-block">
                    <button
                        className={`text-black text-xl font-small px-4 mx-2 rounded transition duration-200 ${(isActive("/public-guides") || isActive("/user-guides")) ? "text-black font-bold hover:text-black" : "hover:text-white"
                            }`}
                        onClick={handleSubMenuToggle}
                    >
                        Panduan
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 inline-block transform ${showSubMenu ? "rotate-180" : ""
                                } transition-transform duration-200`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {showSubMenu && (
                        <div className="absolute z-10 mt-2 py-2 bg-gray-100 rounded-b-md shadow-lg">
                            <Link
                                to="/public-guides"
                                className={`block text-sm px-4 py-2 text-black hover:text-blue-600 ${(isActive("/public-guides") && "text-black font-bold"
                                )}`}
                            >
                                Koneksi ke Web3
                            </Link>
                            <hr />
                            <Link
                                to="/user-guides"
                                className={`block text-sm px-4 py-2 text-black hover:text-blue-600 ${(isActive("/user-guides") && "text-black font-bold"
                                )}`}
                            >
                                Panduan Pengguna
                            </Link>
                        </div>
                    )}
                </div>
                <a
                    href="/public-tracer"
                    className={`text-black text-xl font-small px-4 mx-2 rounded transition duration-200 ${isActive("/public-tracer") ? "font-bold pointer-events-none" : "hover:text-white"}`}
                >
                    Cek Produk
                </a>
            </div>
            <div>
                <button

                    className="text-black text-xl font-medium mx-2 rounded hover:text-white transition duration-200"
                    onClick={handleSignInModal}
                >
                    Sign In
                </button>
                {/* |
        <Link
            to="/register"
            className="text-black font-medium mx-2 rounded hover:text-green-500 transition duration-200"
        >
            Contract Owner
        </Link> */}
                <SignIn isOpen={openModal} onClose={handleCloseModal} />
            </div>
        </div>
    );
};

export default PublicNavbar;
