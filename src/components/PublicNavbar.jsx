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
      <div className="sticky z-10 flex items-center justify-between px-8 py-3 mx-10 mb-4 rounded-full top-6 backdrop-blur-md bg-white/20 border-gradient-to-r from-cyan-500 to-blue-500">
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
              <div className="absolute z-10 py-2 mt-2 bg-gray-100 shadow-lg rounded-b-md">
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
            href="/public-market"
            className={`text-white text-lg   mx-2 rounded transition duration-200 ${
              isActive("/public-market")
                ? "font-bold pointer-events-none"
                : "hover:text-white"
            }`}
          >
            Market
          </a>
          <a
            href="/public-tracer"
            className={`text-white text-lg   ms-5 rounded transition duration-200 ${
              isActive("/public-tracer")
                ? "font-bold pointer-events-none"
                : "hover:text-white"
            }`}
          >
            Product Check
          </a>
        </div>
        <div className="mr-3">
          <button
            className="px-10 py-3 text-white transition-colors duration-300 border-2 border-white rounded-full bg-none hover:bg-blue-800 hover:text-white"
            onClick={handleSignInModal}
          >
            Sign In
          </button>

          {/* <Link
          to="/register"
          className="mx-2 font-medium text-white transition duration-200 rounded hover:text-green-500"
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
