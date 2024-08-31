import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ActorInfo from "./ActorInfo";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { useWeb3 } from "../Web3Provider";

const ActorNavbar = (props) => {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;
  const [isConnected, setIsConnected] = useState(false);
  const { accounts } = useWeb3();

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Metamask not detected");
      }
    };
    initializeWeb3();

    if (isConnected) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      });
      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
      };
    }
  }, [isConnected]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function formatAddress(address) {
    // Sesuaikan dengan panjang karakter yang diinginkan
    const truncatedAddress =
      address.substring(0, 6) + "...." + address.slice(-4);
    return <span>{truncatedAddress}</span>;
  }

  return (
    <>
      <div className="flex justify-end">
        <a href="/" className="block mt-2 md:hidden">
          <FaHome className="mr-2 hover:text-blue-500 " />
        </a>
        <div className="hidden md:block">
          {isConnected ? (
            <div className="flex items-center pr-5 text-black">
              <a href="/">
                <FaHome className="mr-2 hover:text-blue-500" />
              </a>
              <button onClick={handleOpenModal}>
                <FaUserCircle className="mr-2 hover:text-blue-500" />
              </button>
              {formatAddress(accounts[0])}
              {/* <MdCircle className="h-3 m-auto ml-1 text-green-600" /> */}
            </div>
          ) : (
            <div className="flex items-center mx-4 text-black">
              <a href="/">
                <FaHome className="mr-2 hover:text-blue-500" />
              </a>
              Not Connected
              <MdCircle className="h-3 m-auto ml-1 text-red-600" />
            </div>
          )}
        </div>

        <ActorInfo isOpen={modalOpen} onClose={handleCloseModal} />
      </div>
      <div className=" drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          {/* Page content here */}
          {props.children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="w-48 min-h-full p-4 menu bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <li>
              <Link
                to="/dashboard"
                className={`text-black hover:text-blue-500 mx-4 ${
                  isActive("/dashboard") &&
                  "text-black font-bold pointer-events-none"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/market"
                className={`text-black hover:text-blue-500 mx-4 ${
                  isActive("/market") &&
                  "text-black font-bold pointer-events-none"
                }`}
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                to="/trace-product"
                className={`text-black hover:text-blue-500 mx-4 ${
                  isActive("/trace-product") &&
                  "text-black font-bold pointer-events-none"
                }`}
              >
                Trace Asset
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ActorNavbar;
