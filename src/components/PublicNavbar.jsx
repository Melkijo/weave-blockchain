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
    <>
      <div className=" sticky top-6 z-10 flex justify-between items-center mb-4 mx-10  backdrop-blur-md bg-white/20 px-8 py-3 rounded-full border border-gradient-to-r from-cyan-500 to-blue-500">
        <div>
          <Link
            to="/"
            className={`text-white text-xl px-4 mx-2 rounded transition duration-200 ${
              isActive("/")
                ? "font-bold font-display pointer-events-none"
                : "hover:text-white"
            }`}
          >
            WeaveChain
          </Link>
          <div className="relative inline-block">
            <button
              className={`text-white text-lg  px-4 mx-2 rounded transition duration-200 ${
                isActive("/public-guides") || isActive("/user-guides")
                  ? "text-white font-bold hover:text-white"
                  : "hover:text-white"
              }`}
              onClick={handleSubMenuToggle}
            >
              Guide
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 inline-block transform ${
                  showSubMenu ? "rotate-180" : ""
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
                  className={`block text-sm px-4 py-2 text-black hover:text-blue-600 ${
                    isActive("/public-guides") && "text-black font-bold"
                  }`}
                >
                  Connect Web3
                </Link>
                <hr />
                <Link
                  to="/user-guides"
                  className={`block text-sm px-4 py-2 text-black hover:text-blue-600 ${
                    isActive("/user-guides") && "text-black font-bold"
                  }`}
                >
                  User Guide
                </Link>
              </div>
            )}
          </div>
          <a
            href="/public-tracer"
            className={`text-white text-lg   mx-2 rounded transition duration-200 ${
              isActive("/public-tracer")
                ? "font-bold pointer-events-none"
                : "hover:text-white"
            }`}
          >
            Product Check
          </a>
        </div>
        <div>
          <button
            className="rounded-full px-8 py-3 bg-none border border-white text-white  hover:bg-blue-800 hover:text-white transition-colors duration-300"
            onClick={handleSignInModal}
          >
            Sign In
          </button>

          {/* <Link
          to="/register"
          className="text-white font-medium mx-2 rounded hover:text-green-500 transition duration-200"
        >
          Contract Owner
        </Link> */}
        </div>
      </div>
      <SignIn isOpen={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default PublicNavbar;
